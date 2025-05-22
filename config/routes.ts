<<<<<<< HEAD
﻿export default [
=======
﻿import { UserOutlined, DashboardOutlined, TeamOutlined, ToolOutlined, HistoryOutlined, ProfileOutlined } from '@ant-design/icons';

export default [
>>>>>>> Dong
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
<<<<<<< HEAD
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
=======
	// DEFAULT MENU (Admin Dashboard - Keeping for now, could be redirected later)
	{
		path: '/dashboard',
		name: 'Dashboard (Admin)',
		icon: 'DashboardOutlined',
		component: './Student/DashBoard', // This might be an admin dashboard component in a real app
		hideInMenu: true, // Hide from student menu if it's admin dashboard
>>>>>>> Dong
	},
	{
		path: '/student-admin',
		name: 'Quản lý sinh viên',
		component: './StudentAd/StudentAdmin',
		icon: 'TeamOutlined',
	},
	{
		path: '/device-admin',
		name: 'Quản lý thiết bị',
		component: './DeviceAdmin/DeviceAdmin',
		icon: 'DatabaseOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/borrowing-admin',
		name: 'Quản lý mượn trả',
		component: './Borrow/BorrowAdmin',
		icon: 'ScheduleOutlined',
	},

<<<<<<< HEAD
=======
	// STUDENT MENU
	{
		path: '/student',
		name: 'Sinh viên',
		icon: 'UserOutlined',
		routes: [
			{
				path: '/student/dashboard', // Student dashboard route
				name: 'Dashboard',
				icon: 'DashboardOutlined',
				component: './Student/DashBoard',
			},
			{
				path: '/student/profile',
				name: 'Thông tin cá nhân',
				component: './Student/ProfilePage',
				icon: 'ProfileOutlined',
			},
			{
				path: '/student/borrow',
				name: 'Mượn thiết bị',
				component: './Student/BorrowPage',
				icon: 'ToolOutlined',
			},
			{
				path: '/student/history',
				name: 'Lịch sử mượn',
				component: './Student/BorrowHistoryPage',
				icon: 'HistoryOutlined',
			},
		],
	},

	// AUTH ROUTES
	{
		path: '/auth',
		layout: false,
		routes: [
			{
				path: '/auth/login',
				name: 'Đăng nhập',
				component: './auth/LoginPage',
			},
			{
				path: '/auth/login-form',
				name: 'Form đăng nhập',
				component: './auth/LoginForm',
			},
			{
				path: '/auth/register',
				name: 'Đăng ký',
				component: './auth/RegisterPage',
			},
			{
				path: '/auth/register-form',
				name: 'Form đăng ký',
				component: './auth/RegisterForm',
			},
			{
				path: '/auth/forgot-password',
				name: 'Quên mật khẩu',
				component: './auth/ForgotPasswordPage',
			},
			{
				path: '/auth/change-password',
				name: 'Đổi mật khẩu',
				component: './auth/ChangePasswordPage',
			},
		],
	},

>>>>>>> Dong
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
<<<<<<< HEAD
		redirect: '/dashboard',
=======
		redirect: '/auth/login', // Redirect root to login page
>>>>>>> Dong
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
