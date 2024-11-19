import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <ClientLayout id={id}>{children}</ClientLayout>
    </>
  );
}
