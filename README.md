## Blood Donor Search Platform (MERN MVP)

Minimal MERN application where hospitals can locate donors by blood group, city, and availability; donors can register/update their info; hospitals can log outreach and view dashboard stats.

### Project Structure
- `server/` – Express API, MongoDB models, seed script.
- `client/` – React + Vite frontend styled with Tailwind.

### Tech Stack
- Backend: Node.js, Express, Mongoose, bcryptjs.
- Frontend: React 19, Vite, TailwindCSS, React Router, Axios, react-hot-toast.
- Database: MongoDB.

### Prerequisites
1. Node.js 20+ (ensures compatibility with Vite, Nodemon).
2. MongoDB instance running locally or remotely.

### Backend Setup (`server/`)
1. `cd server`
2. `cp env.example .env` and adjust values:
   - `MONGODB_URI`
   - `PORT` (default 5000)
   - `DEFAULT_HOSPITAL_PHONE`
   - `DEFAULT_HOSPITAL_PASSWORD`
3. Install deps (already run here, rerun if needed): `npm install`
4. Seed data (10 donors + default hospital): `npm run seed`
5. Start dev server: `npm run dev`
   - Production start: `npm start`
6. API base URL: `http://localhost:5000/api`

### Frontend Setup (`client/`)
1. `cd client`
2. `cp env.example .env` and ensure `VITE_API_URL` points to backend (default `http://localhost:5000/api`).
3. Install deps (already run here, rerun if needed): `npm install`
4. Run dev server: `npm run dev` (opens on Vite default port 5173).
5. Build: `npm run build`, Preview: `npm run preview`

### Key Pages
| Route | Description |
| --- | --- |
| `/dashboard` | KPI cards for donors + requests. |
| `/donor/register` | Donor intake form. |
| `/donor/manage` | Table + inline edit/toggle availability. |
| `/hospital/login` | Simple credential-based login (no JWT). |
| `/hospital/search` | Protected; filters donors, logs contacts. |
| `/hospital/requests` | Protected; table of all contact logs. |

### API Endpoints
| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/donor` | Create donor. |
| GET | `/api/donor` | List donors. |
| PUT | `/api/donor/:id` | Update donor. |
| GET | `/api/donor/search?blood_group&city&availability_status` | Filter donors. |
| POST | `/api/hospital/login` | Authenticate hospital. |
| POST | `/api/request` | Log contact attempt. |
| GET | `/api/request` | Fetch contact logs. |
| GET | `/api/dashboard/stats` | Donor + request counts. |

### Default Credentials (after seeding)
- Phone: value from `DEFAULT_HOSPITAL_PHONE` (defaults to `999-000-0000`).
- Password: value from `DEFAULT_HOSPITAL_PASSWORD` (defaults to `password123`).

### Development Notes
- `HospitalProvider` stores session in `localStorage`; `ProtectedRoute` guards search/request pages.
- Toast notifications give feedback on create/update/search actions.
- Tailwind config scans `src/**/*.{js,jsx,ts,tsx}` for classes.
- Backend uses simple controllers with mongoose queries; add validation/more auth for production needs.

### Running Both Servers
```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```
Access frontend at `http://localhost:5173`, backend health check at `http://localhost:5000/api/health`.

