import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

function Navbar() {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);

	const isActive = (path) => location.pathname === path;

	return (
		<header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-40 transition-all duration-300 border-b border-white/50">
			<div className="container mx-auto px-4">
				<div className="flex h-20 items-center justify-between">
					<Link
						to="/"
						className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
					>
						QuickComm.
					</Link>

					<nav className="hidden md:flex items-center gap-6">
						<Link
							to="/"
							className={`${isActive("/") ? "text-gray-900" : "text-gray-700"} hover:text-gray-900 transition-colors`}
							aria-current={isActive("/") ? "page" : undefined}
						>
							Home
						</Link>
						<Link
							to="/categories"
							className={`${isActive("/categories") ? "text-gray-900" : "text-gray-700"} hover:text-gray-900 transition-colors`}
							aria-current={isActive("/categories") ? "page" : undefined}
						>
							Explore
						</Link>
						{user && (
							<Link
								to="/cart"
								className={`${isActive("/cart") ? "text-gray-900" : "text-gray-700"} relative group hover:text-gray-900 transition-colors`}
								aria-current={isActive("/cart") ? "page" : undefined}
							>
								<ShoppingCart className="inline-block mr-1" size={20} />
								<span className="hidden sm:inline">Cart</span>
								{cart.length > 0 && (
									<span className="absolute -top-2 -left-2 bg-amber-600 text-white rounded-full px-2 py-0.5 text-xs">
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className="bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center"
								to={"/secret-dashboard"}
							>
								<Lock className="inline-block mr-2" size={18} />
								<span className="hidden sm:inline">Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md flex items-center transition-colors"
								onClick={logout}
							>
								<LogOut size={18} />
								<span className="hidden sm:inline ml-2">Logout</span>
							</button>
						) : (
							<div className="flex items-center gap-3">
								<Link
									to="/signup"
									className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md flex items-center transition-colors"
								>
									<UserPlus className="mr-2" size={18} />
									Sign Up
								</Link>
								<Link
									to="/login"
									className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md flex items-center transition-colors"
								>
									<LogIn className="mr-2" size={18} />
									Login
								</Link>
							</div>
						)}
					</nav>

					<button
						className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
						onClick={() => setMobileOpen((v) => !v)}
						aria-label="Toggle menu"
						aria-expanded={mobileOpen}
					>
						{mobileOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden transition-all duration-200 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden bg-white/90 backdrop-blur border-t border-gray-100`}
				role="dialog"
				aria-modal="true"
			>
				<div className="px-4 py-4 space-y-3">
					<Link
						to="/"
						onClick={() => setMobileOpen(false)}
						className={`${isActive("/") ? "text-gray-900" : "text-gray-700"} block hover:text-gray-900`}
					>
						Home
					</Link>
					<Link
						to="/categories"
						onClick={() => setMobileOpen(false)}
						className={`${isActive("/categories") ? "text-gray-900" : "text-gray-700"} block hover:text-gray-900`}
					>
						Explore
					</Link>
					{user && (
						<Link
							to="/cart"
							onClick={() => setMobileOpen(false)}
							className={`${isActive("/cart") ? "text-gray-900" : "text-gray-700"} block hover:text-gray-900`}
						>
							Cart {cart.length > 0 ? `(${cart.length})` : ""}
						</Link>
					)}
					{isAdmin && (
						<Link
							to="/secret-dashboard"
							onClick={() => setMobileOpen(false)}
							className="block text-gray-700 hover:text-gray-900"
						>
							Dashboard
						</Link>
					)}

					{user ? (
						<button
							onClick={() => {
								logout();
								setMobileOpen(false);
							}}
							className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
						>
							<LogOut size={18} />
							<span className="ml-2">Logout</span>
						</button>
					) : (
						<div className="flex gap-3">
							<Link
								to="/signup"
								onClick={() => setMobileOpen(false)}
								className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
							>
								<UserPlus className="mr-2" size={18} />
								Sign Up
							</Link>
							<Link
								to="/login"
								onClick={() => setMobileOpen(false)}
								className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
							>
								<LogIn className="mr-2" size={18} />
								Login
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

export default Navbar;
