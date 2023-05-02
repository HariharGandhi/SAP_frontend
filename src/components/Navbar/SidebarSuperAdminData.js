import React from "react";
import * as RiIcons from "react-icons/ri";

export const SidebarSuperAdminData = [
{
	title: "Home",
	path: "/superadmindashboard",

},
{
	title: "Payment",
	path: "/getreceipt",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,
},
{
	title: "Application Forms",
	path: "#",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
		{
			title: "Verify Forms",
			path: "/admindashboard",
			cName: "sub-nav",
		},
		{
			title: "All Forms",
			path: "/allform",
			cName: "sub-nav",
		},
	],
},
{
	title: "Placement",
	path: "#",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
		{
			title: "All Placements",
			path: "/getplacement",
		},
		{
			title: "Add Placement",
			path: "/postplacement",
		},
	],
},
{
	title: "Notifications",
	path: "#",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "All Notifications",
		path: "/getnotification",
	},
	{
		title: "Add Notification",
		path: "/addnotice",
	},
	// {
	// 	title: "Update Notification",
	// 	path: "/updatenotice",
	// },
	// {
	// 	title: "Delete Notification",
	// 	path: "/deletenotice",
	// },
	],
},
{
	title: "Modules",
	path: "/getmodules",
	// iconClosed: <RiIcons.RiArrowDownSFill />,
	// iconOpened: <RiIcons.RiArrowUpSFill />,

	// subNav: [
	// {
	// 	title: "All Modules",
	// 	path: "/getmodules",
	// },
	// {
	// 	title: "Add Module",
	// 	path: "#",
	// },
	// ],
},
{
	title: "Contact Forms",
	path:"/contactformdata",

},
{
	title: "Admin",
	path: "#",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
		{
			title: "All Admins",
			path: "/alladmins",
		},
	{
		title: "Add Admin",
		path: "/addadmin",
	},
	],
},

];
