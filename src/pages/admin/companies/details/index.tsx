import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Skeleton, Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MainUtils from "../../../../shared/utils/main";
import Service from "../../../../shared/services/admin/companies";
import { useIntl } from "react-intl";
import useBreadcrumb from "../../../../shared/hooks/use-breadcrumb";
import AppConsts from "../../../../constants/appconst";
import { ICompany } from "../../../../shared/services/admin/companies/dtos/company";
import BasicInfo from "./basic-info";
import Ads from "./ads";
import Coupons from "./coupons";

const CompanyDetails = () => {
  const { messages } = useIntl();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const { setBreadcrumb } = useBreadcrumb();
  const [data, setData] = useState<ICompany>();

  useEffect(() => {
    if (!MainUtils.isEmptyValue(id)) {
      setBreadcrumb([
        { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
        {
          text: messages["Companies"],
          url: `${AppConsts.publicUrl}/admin/companies`,
        },
        { render: <LoadingOutlined /> },
      ]);
      (async () => {
        setLoader(true);
        const res = await Service.get(id);
        if (res) {
          setBreadcrumb([
            { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
            {
              text: messages["Companies"],
              url: `${AppConsts.publicUrl}/admin/companies`,
            },
            {
              text: `${res?.name}`,
              url: `${AppConsts.publicUrl}/admin/companies/${id}`,
            },
          ]);
          setData(res);
        } else {
          setBreadcrumb([
            { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
            {
              text: messages["Companies"],
              url: `${AppConsts.publicUrl}/admin/companies`,
            },
            {
              text: id,
              url: `${AppConsts.publicUrl}/admin/companies/${id}`,
            },
          ]);
        }
        setLoader(false);
      })();
    }
  }, [id, messages, setBreadcrumb]);
  return (
    <Card>
      <Skeleton loading={loader}>
        <Tabs>
          <Tabs.TabPane key={"Info"} tab={messages["CompanyInfo"]}>
            <BasicInfo />
          </Tabs.TabPane>
          <Tabs.TabPane key={"ADs"} tab={messages["ADs"]}>
            <Ads companyId={id} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key={"Coupons"}
            tab={messages["Coupons"]}
          >
            <Coupons companyId={id} />
          </Tabs.TabPane>
        </Tabs>
      </Skeleton>
    </Card>
  );
};
export default CompanyDetails;
