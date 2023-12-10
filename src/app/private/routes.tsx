import PageNotFound from "../../shared/components/page-not-found";
import Activities from "../../pages/admin/activity";
import Sections from "../../pages/admin/section";
import Mood from "../../pages/admin/mood";
import Images from "../../pages/admin/images";
import SectionDetails from "../../pages/admin/section/section-details";
import Reward from "../../pages/admin/reward";
import Badges from "../../pages/admin/badges";
import Companies from "../../pages/admin/companies";
import CompanyDetails from "../../pages/admin/companies/details";
import Ads from "../../pages/admin/companies/details/ads";

export const routes: any = [
  {
    Component: Sections,
    path: "/admin/sections",
    title: "Sections",
    key: "Sections",
  },
  {
    permission: "",
    relatedToKey: "Sections",
    path: "/admin/section/:id",
    Component: SectionDetails,
    title: "SectionDetails",
  },
  {
    Component: Activities,
    path: "/admin/activities",
    title: "Activities",
    key: "activities",
  },
  {
    Component: Badges,
    path: "/admin/badges",
    title: "Badges",
    key: "badges",
  },
  {
    Component: Images,
    path: "/admin/images",
    title: "Images",
    key: "images",
  },
  {
    Component: Mood,
    path: "/admin/moods",
    title: "Moods",
    key: "mood",
  },
  {
    Component: Reward,
    path: "/admin/rewards",
    title: "Rewards",
    key: "reward",
  },
  {
    Component: Companies,
    path: "/admin/companies",
    title: "Companies",
    key: "companies",
  },
  {
    Component: Ads,
    path: "/admin/ads",
    title: "ADs",
    key: "ADs",
  },
  {
    permission: "",
    relatedToKey: "companies",
    path: "/admin/companies/:id",
    Component: CompanyDetails,
    title: "CompanyDetails",
  },
  {
    exact: true,
    permission: "",
    path: "/admin/404-page",
    Component: PageNotFound,
    title: "PageNotFound",
  },
];
