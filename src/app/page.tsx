import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="flex flex-col min-h-dvh">
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://legodesk.com/wp-content/uploads/2021/08/Invoice-Management-Cover.png"
                  width={600}
                  height={400}
                  alt="Responsive Design"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Responsive Design
                </h2>
                <p className="text-muted-foreground">
                  Our Invoice Manager app is designed to work seamlessly on both
                  desktop and mobile devices, ensuring a consistent and
                  user-friendly experience no matter how you access it.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Login to Create Invoices
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                   Create account to Create Invoices
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* list of service */}
        <main className="py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Key Features of Invoice Manager
                </h2>
                <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                  Our Invoice Manager app offers a comprehensive set of features
                  to streamline your invoicing process.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center gap-4">
                  <FilePlusIcon className="size-8 text-primary" />
                  <h3 className="text-lg font-semibold">Create Invoices</h3>
                  <p className="text-muted-foreground text-center">
                    Easily create invoices with customizable templates and
                    client information.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <EyeIcon className="size-8 text-primary" />
                  <h3 className="text-lg font-semibold">View Invoices</h3>
                  <p className="text-muted-foreground text-center">
                    Access and view all your invoices in one place, with
                    detailed information.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <FilePenIcon className="size-8 text-primary" />
                  <h3 className="text-lg font-semibold">Update Invoices</h3>
                  <p className="text-muted-foreground text-center">
                    Easily update invoice details, such as client information
                    and total amounts.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <TrashIcon className="size-8 text-primary" />
                  <h3 className="text-lg font-semibold">Delete Invoices</h3>
                  <p className="text-muted-foreground text-center">
                    Remove invoices that are no longer needed, with a
                    confirmation step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function FilePlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M9 15h6" />
      <path d="M12 18v-6" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}