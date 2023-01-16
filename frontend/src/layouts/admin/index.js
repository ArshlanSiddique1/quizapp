// Chakra imports
import { Portal, Box, } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import routes from "routes.js";
import MainDashboard from "views/admin/default";
import Sectors from "views/admin/sector/components/view";
import CreateSector from "views/admin/sector/components/add";
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
import CategoryFormUpdate from "../../views/admin/Categories/view/Edit/CategoryFormUpdate"



// Custom Chakra theme
export default function Dashboard(props) {
  const history = useHistory();
  useEffect(() => {
    const userInfo = localStorage.getItem("UsersData");
    if (userInfo) {
      history.push("/admin/default");
    }
    if (!userInfo) {
      history.replace("/singIn");
    }
  }, []);

  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);


  const getActiveRoute = (routes) => {
    let getTrimBreadCum = props.location.pathname.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let removeBreadCum = getTrimBreadCum.replace('admin', '');
    let getSpaceBreadCum = removeBreadCum.replace(/([A-Z])/g, ' $1')

    let getBreadCum = getSpaceBreadCum.replace(/^./, function (str) { return str.toUpperCase(); })

    let activeRoute = getBreadCum;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      }

      else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      }

      else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  return (

    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}>
        <Sidebar routes={routes} display='none' {...rest} />
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Portal>
            <Box>
              <Navbar
                logoText={"Horizon UI Dashboard PRO"}
                brandText={getActiveRoute(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
          <Box
            mx='auto'
            p={{ base: "20px", md: "30px" }}
            pe='20px'
            minH='100vh'
            pt='50px'>
            {
              props.location.pathname === "/default"
                ?
                <MainDashboard />
                :
                props.location.pathname === "/admin/Sectors"
                  ?
                  <Sectors /> :

                  props.location.pathname === "/admin/CreateSector"
                    ?
                    <CreateSector /> :

                    props.location.pathname === "/admin/Categories"
                      ?
                      <Categories /> :

                      props.location.pathname === "/admin/ViewCategory"
                        ?
                        <ViewCategory /> :

                        props.location.pathname === "/admin/Grades"
                          ?
                          <Grades /> :

                          props.location.pathname === "/admin/ViewGrade"
                            ?
                            <ViewGrade /> :

                            props.location.pathname === "/admin/Subjects"
                              ?
                              <Subjects /> :

                              props.location.pathname === "/admin/ViewSubjects"
                                ?
                                <ViewSubjects /> :

                                props.location.pathname === "/admin/Sections"
                                  ?
                                  <Sections /> :

                                  props.location.pathname === "/admin/ViewSection"
                                    ?
                                    <ViewSection /> :

                                    props.location.pathname === "/admin/Questions"
                                      ?
                                      <Questions /> :

                                      props.location.pathname === "/admin/ViewQuestion"
                                        ?
                                        <ViewQuestion /> :

                                        props.location.pathname === "/admin/EditCategory"
                                          ?
                                          <CategoryFormUpdate /> :

                                          <MainDashboard />
            }
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
