export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold text-white">BlogApp</h2>
            <p className="text-slate-400 text-sm mt-2">
              A modern blog platform built with MERN stack.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Create Post
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Profile
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-3">Follow</h3>
            <div className="flex gap-3 text-slate-400 text-sm">
              <span className="hover:text-white transition cursor-pointer">
                GitHub
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Twitter
              </span>
              <span className="hover:text-white transition cursor-pointer">
                LinkedIn
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm">
          © 2026 BlogApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
