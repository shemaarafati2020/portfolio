import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactData {
  name: string
  email: string
  subject?: string
  message: string
}

const TO_EMAIL = 'shemaarafati940@gmail.com'

function buildHtml(data: ContactData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#0a0a0a; color:#e5e7eb; margin:0; padding:0; }
    .wrapper { max-width:600px; margin:32px auto; background:#111827; border-radius:16px; overflow:hidden; border:1px solid #1f2937; }
    .header { background:linear-gradient(135deg,#10b981,#3b82f6); padding:32px 40px; }
    .header h1 { margin:0; font-size:22px; color:#fff; font-weight:700; }
    .header p  { margin:6px 0 0; color:rgba(255,255,255,0.8); font-size:14px; }
    .body { padding:32px 40px; }
    .field { margin-bottom:20px; }
    .label { font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:#6b7280; margin-bottom:6px; }
    .value { background:#1f2937; border-radius:10px; padding:14px 18px; color:#f9fafb; font-size:15px; line-height:1.6; word-break:break-word; }
    .message .value { white-space:pre-wrap; }
    .footer { padding:20px 40px; border-top:1px solid #1f2937; text-align:center; color:#4b5563; font-size:12px; }
    a { color:#10b981; text-decoration:none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📬 New Portfolio Message</h1>
      <p>Someone contacted you via your portfolio website</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Reply-to</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.subject ? `
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${data.subject}</div>
      </div>` : ''}
      <div class="field message">
        <div class="label">Message</div>
        <div class="value">${data.message}</div>
      </div>
      <div class="field">
        <div class="label">Sent at</div>
        <div class="value">${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Kigali', dateStyle: 'full', timeStyle: 'short' })}</div>
      </div>
    </div>
    <div class="footer">
      Sent from <a href="https://shema-portfolio.vercel.app">shema portfolio</a> · Reply directly to ${data.email}
    </div>
  </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json()

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ── Nodemailer via Gmail SMTP ─────────────────────────────────────────────
    // Set GMAIL_USER and GMAIL_APP_PASS in .env.local
    // Generate an App Password at: https://myaccount.google.com/apppasswords
    // ─────────────────────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: data.subject
        ? `[Portfolio] ${data.subject} — from ${data.name}`
        : `[Portfolio] New message from ${data.name}`,
      html: buildHtml(data),
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`,
    })

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 })
  } catch (error) {
    console.error('[contact] send error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
