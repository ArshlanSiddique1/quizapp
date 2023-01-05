import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome, MdAreaChart, MdCategory, MdGrade, MdBook, MdSegment, MdQuestionAnswer,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Sectors from "./views/admin/sector/components/view"
import ViewCategory from "views/admin/Categories/view"
import ViewGrade from "views/admin/grades/view"
import ViewSubjects from "views/admin/subject/view"
import ViewSection from "views/admin/section/view"
import ViewQuestion from "views/admin/question/view"
import { ClassNames } from "@emotion/react";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Sector",
    layout: "/admin",
    path: "/Sectors",
    icon: <Icon as={MdAreaChart} width='20px' height='20px' color='inherit' />,
    component: Sectors,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "/ViewCategory",
    icon: <Icon as={MdCategory} width='20px' height='20px' color='inherit' />,
    component: ViewCategory,
  },
  {
    name: "Grades",
    layout: "/admin",
    path: "/ViewGrade",
    icon: <Icon as={MdGrade} width='20px' height='20px' color='inherit' />,
    component: ViewGrade,
  },
  {
    name: "Subjects",
    layout: "/admin",
    path: "/ViewSubjects",
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    component: ViewSubjects,
  },
  {
    name: "Section",
    layout: "/admin",
    path: "/ViewSection",
    icon: <Icon as={MdSegment} width='20px' height='20px' color='inherit' />,
    component: ViewSection,
  },
  {
    name: "Question",
    layout: "/admin",
    path: "/ViewQuestion",
    icon: <Icon as={MdQuestionAnswer} width='20px' height='20px' color='inherit' />,
    component: ViewQuestion,
  },
];


export default routes;
