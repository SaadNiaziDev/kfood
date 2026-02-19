# KFood Partner Form – Cloudflare Worker

Receives the partner form POST and sends an email to contact@kfood.pk via [Resend](https://resend.com).

## Setup

1. **Resend**
   - Sign up at [resend.com](https://resend.com).
   - Create an API key in the dashboard.
   - For production, add and verify your domain (e.g. kfood.pk) and set `FROM_EMAIL` to something like `KFood <partner@kfood.pk>`. For testing you can use `onboarding@resend.dev`.

2. **Deploy the worker**
   ```bash
   cd worker
   npm install
   npx wrangler login
   npx wrangler deploy
   ```
   The worker uses the [Resend Node.js SDK](https://www.npmjs.com/package/resend); `npm install` pulls it in before deploy.

3. **Secrets**
   ```bash
   npx wrangler secret put RESEND_API_KEY
   # Optional: redirect after submit
   npx wrangler secret put SUCCESS_REDIRECT_URL
   ```
   When prompted, enter your Resend API key and, if desired, a URL like `https://kfood.pk/?partner=success`.

4. **Site env**
   In your Astro project set the form action to the worker URL:
   ```env
   PUBLIC_FORM_SUBMIT_URL=https://kfood-partner-form.<your-subdomain>.workers.dev
   ```
   Use the URL shown after `wrangler deploy`.

## Testing (send a dummy email)

1. **Local secrets**  
   Copy the example file and add your Resend API key:
   ```bash
   cd worker
   cp .dev.vars.example .dev.vars
   ```
   Edit `.dev.vars` and set `RESEND_API_KEY=re_your_actual_key` (from [resend.com](https://resend.com) dashboard). `.dev.vars` is in `.gitignore`.
   To receive the test email in your own inbox, add:
   ```
   TO_EMAIL=your-email@example.com
   ```

2. **Start the worker locally**
   ```bash
   cd worker
   npx wrangler dev
   ```
   Leave it running (default: http://localhost:8787).

3. **Send a dummy form submission**
   In another terminal:
   ```bash
   cd worker
   chmod +x test-form.sh
   ./test-form.sh
   ```
   Or against a deployed worker:
   ```bash
   ./test-form.sh https://kfood-partner-form.<your-subdomain>.workers.dev
   ```
   Check the inbox for `contact@kfood.pk` (or the `TO_EMAIL` you set) for the test email.

4. **Or with curl**
   ```bash
   curl -X POST http://localhost:8787 \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "name=Test+Partner" \
     -d "company=Test+Co" \
     -d "email=test@example.com" \
     -d "phone=+923001234567" \
     -d "message=Test+message"
   ```

## Optional vars in `wrangler.toml`

- `FROM_EMAIL` – sender (default: `KFood <onboarding@resend.dev>`).
- `TO_EMAIL` – recipient (default: `contact@kfood.pk`).
- `SUCCESS_REDIRECT_URL` – set via secret for redirect after submit.
