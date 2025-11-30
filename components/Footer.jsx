export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-5 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-300">© {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
