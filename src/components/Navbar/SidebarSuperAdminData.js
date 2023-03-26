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

},
{
	title: "Application Forms",
	path: "/Viewform",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Verify Forms",
		path: "/Viewform",
		cName: "sub-nav",
	},
	{
		title: "Delete Forms",
		path: "/deleteform",
		cName: "sub-nav",
	},
	],
},
{
	title: "Placement",
	path: "/getplacement",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Placement",
		path: "/postplacement",
	},
	],
},
{
	title: "Notifications",

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Notification",
		path: "/addnotice",
	},
	{
		title: "Update Notification",
		path: "/updatenotice",
	},
	{
		title: "Delete Notification",
		path: "/deletenotice",
	},
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
