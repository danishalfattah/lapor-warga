import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
  title: 'Login - LaporWarga',
  description: 'Login ke akun LaporWarga Anda',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-dark-brown">Selamat Datang Kembali</h1>
          <p className="mt-2 text-dark-brown/70">Login untuk melaporkan masalah di lingkungan Anda</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
