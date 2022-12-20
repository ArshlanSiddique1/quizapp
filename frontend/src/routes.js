import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdAreaChart,
  MdCategory,
  MdGrade,
  MdBook,
  MdSegment,
  MdQuestionAnswer,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Sectors from "views/admin/sectors";
import Categories from "views/admin/Categories";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Sectors",
    layout: "/admin",
    path: "/sectors",
    icon: (
      <Icon as={MdAreaChart} width='20px' height='20px' color='inherit' />
    ),
    component: Sectors,
    // secondary: true,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "/Categories",
    icon: <Icon as={MdCategory} width='20px' height='20px' color='inherit' />,
    component: Categories,
  },
  {
    name: "Grades",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdGrade} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },

  {
    name: "Subjects",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
  },
  {
    name: "Sections",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdSegment} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sector ",
    layout: "/admin",
    path: "/data-tables",
    icon: <Icon as={MdQuestionAnswer} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdGrade} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
