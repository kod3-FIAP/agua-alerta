import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { EmergencyMap } from "./components/emergency-map";

export default async function DashboardPage() {
  // Check if user is authenticated
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });

    // If user is not logged in, redirect to login
    if (!session?.user) {
      redirect("/login");
    }
  } catch (error) {
    // If there's an error getting session, redirect to login
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo, {session.user.name || session.user.email}!
          </p>
        </div>

        {/* Emergency Map */}
        <div className="mb-8">
          <EmergencyMap />
        </div>
      </div>
    </div>
  );
}
