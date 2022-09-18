import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Statistic, Segment, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";


export function Home(props) {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function load() {
      Home.abortController = new AbortController();
      if (Home.abortController) {
        Home.abortController.abort(); // Cancel the previous request
      }
      Home.abortController = new AbortController();
      setLoading(true);
      const response = await fetch(`part/summary`, {
        signal: Home.abortController.signal
      });
      if (response.status === 200) {
        const data = await response.json();
        setSummary(data || {});
      } else {
        setSummary({});
      }
      setLoading(false);
      return async function cleanup() {
        await Home.abortController.abort();
      };
    }

    load();
  }, [setLoading, setSummary]);

  const route = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(url);
  };

  return (
    <div>
      <h1>{t("welcome_message")}</h1>
      <p>{t("app_description")}</p>
      <Segment>
        <Statistic.Group widths="three">
          <Statistic onClick={(e) => route(e, "/inventory/add")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="plus" />
            </Statistic.Value>
            <Statistic.Label>{t("add_inventory")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/inventory")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="search" />
            </Statistic.Value>
            <Statistic.Label>{t("search_inventory")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/datasheets")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="file alternate" />
            </Statistic.Value>
            <Statistic.Label>{t("datasheet")}</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Statistic.Group widths="four" size="tiny" style={{ marginTop: "50px" }}>
          <Statistic onClick={(e) => route(e, "/lowstock")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="battery low" />
            </Statistic.Value>
            <Statistic.Label>{t("low_stock_view")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/partTypes")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="sitemap" />
            </Statistic.Value>
            <Statistic.Label>{t("part_types")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/projects")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="folder open" />
            </Statistic.Value>
            <Statistic.Label>{t("projects")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/exportData")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="cloud download" />
            </Statistic.Value>
            <Statistic.Label>{t("import/export")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/print")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="print" />
            </Statistic.Value>
            <Statistic.Label>{t("print_labels")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/tools")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="wrench" />
            </Statistic.Value>
            <Statistic.Label>{t("tools")}</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/settings")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="cog" />
            </Statistic.Value>
            <Statistic.Label>{t("settings")}</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>

      <h2>{t("dashboard")}</h2>
      <Segment inverted loading={loading} textAlign="center">
        <Statistic.Group widths="five">
          <Statistic color="red" inverted>
            <Statistic.Value>
              <Icon name="battery low" />
              {summary.lowStockCount}
            </Statistic.Value>
            <Statistic.Label>{t("low_stock")}</Statistic.Label>
          </Statistic>
          <Statistic color="orange" inverted>
            <Statistic.Value>
              <Icon name="microchip" />
              {summary.partsCount}
            </Statistic.Value>
            <Statistic.Label>{t("parts")}</Statistic.Label>
          </Statistic>
          <Statistic color="orange" inverted>
            <Statistic.Value>
              <Icon name="microchip" />
              {summary.uniquePartsCount}
            </Statistic.Value>
            <Statistic.Label>{t("unique_parts")}</Statistic.Label>
          </Statistic>
          <Statistic color="green" inverted>
            <Statistic.Value>
              <Icon name="dollar" />
              {(summary.partsCost || 0).toFixed(2)}
            </Statistic.Value>
            <Statistic.Label>{t("value")}</Statistic.Label>
          </Statistic>
          <Statistic color="blue" inverted>
            <Statistic.Value>
              <Icon name="folder open" />
              {summary.projectsCount}
            </Statistic.Value>
            <Statistic.Label>{t("projects")}</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </div>
  );
}
