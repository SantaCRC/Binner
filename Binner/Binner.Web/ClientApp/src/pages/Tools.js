import React from "react";
import { useNavigate } from "react-router-dom";
import { Segment, Statistic, Icon } from "semantic-ui-react";
import { Translation } from "react-i18next";

export function Tools(props) {
  const navigate = useNavigate();
  const route = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(url);
  };

  return (
    <div>
      <h1><Translation>{t => <label>{t('tools')}</label>}</Translation></h1>
      <p>Binner includes a suite of free utilities common to daily life in electrical engineering.</p>
      <Segment>
        <Statistic.Group widths="three">
          <Statistic onClick={(e) => route(e, "/tools/resistor")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="wrench" />
            </Statistic.Value>
            <Statistic.Label>Resistor Color Code Calculator</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/tools/ohmslaw")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="wrench" />
            </Statistic.Value>
            <Statistic.Label>Ohms Law Calculator</Statistic.Label>
          </Statistic>
          <Statistic onClick={(e) => route(e, "/tools/voltagedivider")} style={{ cursor: "pointer" }}>
            <Statistic.Value>
              <Icon name="wrench" />
            </Statistic.Value>
            <Statistic.Label>Voltage Divider Calculator</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </div>
  );
}
