export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="max-w-screen-sm mx-auto p-5">{children}</div>;
}
