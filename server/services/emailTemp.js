const forgetPassTemp = (item) => {
  return `
    <body style="margin:0; padding:0; font-family:Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:60px 0;">
    <tr>
      <td align="center">

        <!-- Outer Glow -->
        <div style="
          max-width:520px;
          padding:2px;
          border-radius:28px;
          background:linear-gradient(135deg, #ffffff, #dfe4ea, #ffffff);
        ">

          <!-- Main Card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="
            background:#ffffff;
            border-radius:26px;
            padding:46px 38px;
            box-shadow:
              0 30px 60px rgba(0,0,0,0.12),
              inset 0 0 0 1px #f1f3f5;
            position:relative;
            overflow:hidden;
          ">

            <!-- Decorative Grid -->
            <tr>
              <td>
                <div style="
                  position:absolute;
                  inset:0;
                  background-image:
                    radial-gradient(circle at 1px 1px, #eaeaea 1px, transparent 0);
                  background-size:26px 26px;
                  opacity:0.35;
                "></div>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td align="center" style="position:relative; z-index:2;">

                <!-- Logo -->
                <h1 style="
                  margin:0 0 6px 0;
                  font-size:30px;
                  font-weight:800;
                  letter-spacing:1.5px;
                  color:#111;
                ">
                  REX<span style="color:#8b8b8b;">IFY</span>
                </h1>

                <!-- Accent Line -->
                <div style="
                  width:60px;
                  height:4px;
                  background:linear-gradient(90deg, #111, #999, #111);
                  margin:12px auto 26px auto;
                  border-radius:2px;
                "></div>

                <!-- Title -->
                <h2 style="
                  margin:0 0 14px 0;
                  font-size:22px;
                  font-weight:700;
                  color:#111;
                ">
                  Reset your password
                </h2>

                <!-- Message -->
                <p style="
                  margin:0 0 34px 0;
                  font-size:15px;
                  color:#444;
                  line-height:1.7;
                ">
                  We received a request to reset your <b>Rexify</b> password.<br/>
                  Click the button below to create a new one.
                </p>

                <!-- Reset Button -->
                <a href="${item}" style="
                  display:inline-block;
                  padding:16px 36px;
                  border-radius:16px;
                  background:
                    linear-gradient(#111, #111) padding-box,
                    linear-gradient(135deg, #999, #111) border-box;
                  border:2px solid transparent;
                  color:#ffffff;
                  text-decoration:none;
                  font-size:15px;
                  font-weight:700;
                  letter-spacing:0.5px;
                  box-shadow:
                    0 16px 40px rgba(0,0,0,0.25);
                ">
                  Reset Password
                </a>

                <!-- Secondary Info -->
                <p style="
                  margin:34px 0 0 0;
                  font-size:13px;
                  color:#666;
                  line-height:1.6;
                ">
                  This link will expire in <b>2 hours</b>.<br/>
                  If you didn’t request this, you can safely ignore this email.
                </p>

                <!-- Footer -->
                <div style="
                  margin-top:38px;
                  padding-top:20px;
                  border-top:1px dashed #e1e1e1;
                ">
                  <p style="
                    margin:0;
                    font-size:12px;
                    color:#9a9a9a;
                  ">
                    © 2026 Rexify · Secure Access · Future-Ready Commerce
                  </p>
                </div>

              </td>
            </tr>

          </table>
        </div>

      </td>
    </tr>
  </table>

</body>

  `
}


module.exports = { forgetPassTemp }