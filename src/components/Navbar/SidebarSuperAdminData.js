import React from "react";
import * as RiIcons from "react-icons/ri";

export const SidebarSuperAdminData = [
{
	title: "Home",
	path: "/admindashboard",

},
{
	title: "Payment",
	path: "/payment",
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
	title: "Contact Forms",
	path:"/contactformdata",

},
{
	title: "Admin",
	path: "/alladmins",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Admin",
		path: "/addadmin",
	},
	],
},

];
