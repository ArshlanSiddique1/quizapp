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
import CreateSector from "views/admin/sector/components/add";
import Sectors from "./views/admin/sector/components/view"
import Categories from "views/admin/Categories/add";
import ViewCategory from "views/admin/Categories/view"
import Grades from "views/admin/grades/add"
import ViewGrade from "views/admin/grades/view"
import Subjects from "views/admin/subject/add"
import ViewSubjects from "views/admin/subject/view"
import Sections from "views/admin/section/add"
import ViewSection from "views/admin/section/view"
import Questions from "views/admin/question/add"
import ViewQuestion from "views/admin/question/view"

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
    path: "/Sectors",
    icon: (
      <Icon as={MdAreaChart} width='20px' height='20px' color='inherit' />
    ),
    component: Sectors,
  },
  {
    name: "Create Sector",
    layout: "/admin",
    path: "/CreateSector",
    icon: <Icon as={MdAreaChart} width='20px' height='20px' color='inherit' />,
    component: CreateSector,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "/Categories",
    icon: <Icon as={MdCategory} width='20px' height='20px' color='inherit' />,
    component: Categories,
  }, {
    name: "View Categories",
    layout: "/admin",
    path: "/ViewCategory",
    icon: <Icon as={MdCategory} width='20px' height='20px' color='inherit' />,
    component: ViewCategory,
  },
  {
    name: "Grades",
    layout: "/admin",
    path: "/Grades",
    icon: <Icon as={MdGrade} width='20px' height='20px' color='inherit' />,
    component: Grades,
  },
  {
    name: "View Grades",
    layout: "/admin",
    path: "/ViewGrade",
    icon: <Icon as={MdGrade} width='20px' height='20px' color='inherit' />,
    component: ViewGrade,
  },
  {
    name: "Subjects",
    layout: "/admin",
    path: "/Subjects",
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    component: Subjects,
  },
  {
    name: "View Subjects",
    layout: "/admin",
    path: "/ViewSubjects",
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    component: ViewSubjects,
  },
  {
    name: "Sections",
    layout: "/admin",
    path: "/Sections",
    icon: <Icon as={MdSegment} width='20px' height='20px' color='inherit' />,
    component: Sections,
  },
  {
    name: "View Section",
    layout: "/admin",
    path: "/ViewSection",
    icon: <Icon as={MdSegment} width='20px' height='20px' color='inherit' />,
    component: ViewSection,
  },
  {
    name: "Questions",
    layout: "/admin",
    path: "/Questions",
    icon: <Icon as={MdQuestionAnswer} width='20px' height='20px' color='inherit' />,
    component: Questions,
  },
  {
    name: "View Question",
    layout: "/admin",
    path: "/ViewQuestion",
    icon: <Icon as={MdQuestionAnswer} width='20px' height='20px' color='inherit' />,
    component: ViewQuestion,
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
