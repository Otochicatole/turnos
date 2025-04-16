import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const Token = 're_8dgYqnF5_ByfaaVBo6ZAvzwD8xP74ysmV';
const resend = new Resend(Token);

export async function POST(req: NextRequest) {
    const { nombre, apellido, mensaje } = await req.json();

    try {
        await resend.emails.send({
            from: 'Ventus <onboarding@resend.dev>',
            to: 'patriciogonzalez1230@gmail.com',
            subject: 'Ventus barber',
            text: `
                Nombre: ${nombre}
                Apellido: ${apellido}
                Mensaje: ${mensaje}
            `
        });
        return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
    }
}