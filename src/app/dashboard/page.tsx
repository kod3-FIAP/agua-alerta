import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";

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
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo, {session.user.name || session.user.email}!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Zonas de Emissão
            </h2>
            <p className="text-gray-600">Gerencie as zonas de emissão</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Abrigos
            </h2>
            <p className="text-gray-600">Visualize e gerencie abrigos</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Emissores
            </h2>
            <p className="text-gray-600">Configure emissores de alerta</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Receptores
            </h2>
            <p className="text-gray-600">Monitore receptores</p>
          </div>
        </div>
      </div>
    </div>
  );
}
