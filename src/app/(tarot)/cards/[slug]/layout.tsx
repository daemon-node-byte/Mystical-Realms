

type Props = {
  readonly children: React.ReactNode;
};


export default async function Layout({ children }: Readonly<Props>) {
  return (
    <main className="min-h-screen">
			{children}
    </main>
  );
}