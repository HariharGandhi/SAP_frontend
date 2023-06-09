import React from "react";
import * as RiIcons from "react-icons/ri";

export const SidebarAdminData = [
{
	title: "Home",
	path: "/admindashboard",

},
{
	title: "Payment Verification",
	path: "/getreceipt",

},
{
	title: "Application Forms",
	path: "#",
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	// {
	// 	title: "View Forms",
	// 	path: "/admindashboard",
	// 	cName: "sub-nav",
	// },
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
	path:"#",
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
];
