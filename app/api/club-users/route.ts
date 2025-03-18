import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { pool } from "../db";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET 미설정");

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      authority: number;
      region: string;
      university: string;
    };

    if (decoded.authority > 7) {
      return NextResponse.json(
        { error: "접근 권한이 없습니다" },
        { status: 403 }
      );
    }

    const connection = await pool.getConnection();
    const { searchParams } = new URL(request.url);

    const authority = searchParams.get("authority");
    const region = searchParams.get("region");
    const university = searchParams.get("university");

    let query =
      "SELECT id, name, gender, phone, birthday, region, university, major, student_id, grade, is_cherry_club_member, vision_camp_batch FROM users WHERE is_cherry_club_member != -1 AND group_number != '졸업'";
    const params: any[] = [];

    if (authority === "3") {
      query += " AND region = ?";
      params.push(region);
    } else if (authority === "4") {
      query += " AND university = ? AND region = ?";
      params.push(university, region);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await connection.query(query, params);

    const countQuery = `
      SELECT COUNT(*) as total FROM users WHERE is_cherry_club_member != -1 AND group_number != '졸업' 
      ${
        authority === "3"
          ? "AND region = ?"
          : authority === "4"
          ? "AND university = ? AND region = ?"
          : ""
      }
    `;
    const [countResult] = await connection.query(
      countQuery,
      params.slice(0, -2)
    );
    const total = (countResult as mysql.RowDataPacket[])[0].total;

    connection.release();

    return NextResponse.json(
      {
        data: rows,
        pagination: {
          total,
        },
      },
      { headers: { "Cache-Control": "public, max-age=60" } }
    );
  } catch (error) {
    console.error("Database error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "유효하지 않은 토큰입니다" },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Authorization 헤더 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // JWT 검증
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다");
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const connection = await pool.getConnection();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { status } = await request.json();

    // 상태 값 검증 (Set 사용)
    const validStatuses = new Set(["1", "0"]);
    if (!id || !validStatuses.has(status)) {
      return NextResponse.json(
        { error: "유효하지 않은 요청입니다" },
        { status: 400 }
      );
    }

    // 트랜잭션 시작
    await connection.beginTransaction();

    try {
      // 상태 업데이트 쿼리
      await connection.query(
        "UPDATE users SET is_cherry_club_member = ? WHERE id = ?",
        [Number(status), id]
      );

      await connection.commit();
      return NextResponse.json({ success: true });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Database error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "유효하지 않은 토큰입니다" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
