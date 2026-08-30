# Pawborough

An original cozy social-pet browser game inspired by the feature breadth and spirit of late-2000s social games. It does not include Pet Society code, branding, or artwork.

## Architecture

The application follows the CQRS + Event Sourcing shape used in `inventory-shopify`:

- command endpoints validate intent and append immutable, versioned events;
- the SQLite event store enforces one version per aggregate;
- queries replay events into the current `GameState` projection;
- every user owns a durable pet/game aggregate;
- authentication is passwordless email with a six-digit, hashed, 10-minute, five-attempt code and a signed HTTP-only session cookie.

Implemented event families include pet design, care, purchasing, item use/equip/place, daily rewards, activities, gardening, petlings, and social progression. See [the feature audit](docs/original-feature-audit.md).

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

With SMTP variables omitted, development codes appear in the server log and are returned to the local sign-in UI. Production never returns the code. Configure `SMTP_*`, a strong `JWT_SECRET`, and a persistent `DATABASE_PATH` for deployment.

## Verify

```bash
npm run typecheck
npm run build
curl http://localhost:3000/api/health
```

The original town background was generated specifically for this project and lives at `public/art/pawborough-town.png`.
