import RegisterForm from '@/components/forms/RegisterForm';

export const metadata = {
  title: 'Daftar - LaporWarga',
  description: 'Buat akun LaporWarga baru',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-dark-brown">Bergabung dengan LaporWarga</h1>
          <p className="mt-2 text-dark-brown/70">Mulai berkontribusi untuk lingkungan yang lebih baik</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
