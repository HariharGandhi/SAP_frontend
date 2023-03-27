import React from "react";
import * as RiIcons from "react-icons/ri";

export const SidebarAdminData = [
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
	path: "/admindashboard",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Verify Forms",
		path: "/admindashboard",
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
	path:"/getnotification",
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
];
