import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import pool from '../../../lib/db';
import genetateId from '../../../utils/generatorId'

//? function to check whether logged in user is admin or not
async function isAdmin(email) {
    try{
        const result = await pool.query(
            "select * from members where email = $1",
            [email]
        );
        return result.rows[0]?.role == 'admin';
    }catch(rr){
        console.log(err);
        return false;
    }
}

//? function to get all members (only admin can access)
export async function GET(req) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    // checking if user exists or not
    // if (!email || !(await isAdmin(email))) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    // }
    try {
        const result = await pool.query('select * from members');
        return NextResponse.json(result.rows, { status: 200 });
    }catch {
        console.log(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

//? Function to add new member
export async function POST(req) {
    const session = await getServerSession(authOptions);
    console.log(session);
    const adminemail = session?.user?.email;

    // Check if user is admin
    // if (!adminemail || !(await isAdmin(adminemail))) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    // }

    try {
        const body = await req.json();
        const { year, name, email, phone, department, department_roll, position, excom, linkedin, access } = body;
        if (!year || !name || !email || !phone || !department || !department_roll || !position || !excom || !linkedin || !access) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        let countResult = await pool.query(
            `SELECT COUNT(*) FROM members where id ~ $1`,
            [`^${year}`]
        );
        let number = parseInt(countResult.rows[0].count, 10);
        let id = genetateId(position, year, number+1);
        console.log(id);

        await pool.query(
            `INSERT INTO members (id, name, email, phone, department, department_roll, position, excom, linkedin, access, join_date)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
            [id, name, email, phone, department, department_roll, position, excom, linkedin, access]
        );

        return NextResponse.json({ message: 'Member added successfully' }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}