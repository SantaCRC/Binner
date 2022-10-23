import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Translation } from 'react-i18next';

export class ExportData extends Component {
  static displayName = ExportData.name;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: {},
      exportFormat: '',
      exportFormats: [
        {
          key: 1,
          value: 'Excel',
          text: 'Excel',
        },
        {
          key: 2,
          value: 'CSV',
          text: 'CSV',
        },
        {
          key: 3,
          value: 'SQL',
          text: 'SQL',
        },
      ]
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
  }

  async onSubmit(e) {
    const { exportFormat } = this.state;
    this.setState({ loading: true });

    window.location = `/export?exportFormat=${exportFormat}`

    this.setState({ loading: false });
  }

  handleChange(e, control) {
    this.setState({ exportFormat: control.value });
  }

  render() {
    const { exportFormat, exportFormats, loading } = this.state;
    return (
      <div>
        <h1><Translation>{t => <label>{t('data_export')}</label>}</Translation></h1>
        <p>
          Export your Binner database to a human-readable format.
        </p>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Form.Group>
            <Translation>{t =><Form.Dropdown label={t('format')} placeholder={t('choose_format')} selection value={exportFormat} options={exportFormats} onChange={this.handleChange} name='exportFormat' />}</Translation>
          </Form.Group>
          <Button primary><Translation>{t => <label>{t('export')}</label>}</Translation></Button>
        </Form>
      </div>
    );
  }
}
