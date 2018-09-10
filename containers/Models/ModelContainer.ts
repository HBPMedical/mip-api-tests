// tslint:disable:no-console
import * as dotenv from 'dotenv';
import request from 'request-promise-native';
import { Container } from 'unstated';
import { config } from '../../src/mocks';
import { IModelContainer } from '../../types';

dotenv.config();

class ModelContainer extends Container<IModelContainer> {
  public state = {
    error: undefined,
    loading: true,
    model: undefined,
  };

  private baseUrl = `${process.env.BACKEND_URL}/models`;

  public load = async (slug: string) => {
    await this.setState({ loading: true });
    try {
      const data = await request.get(`${this.baseUrl}/${slug}`, config);
      const json = await JSON.parse(data);
      if (json.error) {
        return await this.setState({
          error: json.error,
          loading: false,
        });
      }

      return await this.setState({
        error: undefined,
        loading: false,
        model: json,
      });
    } catch (error) {
      return await this.setState({
        error: error.message,
        loading: false,
      });
    }
  }

  public create = async (params: any) => {
    await this.setState({ loading: true });
    try {
      const data = await request({
        body: JSON.stringify(params),
        headers: {
          ...config.headers,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        uri: `${this.baseUrl}`,
      });
      const json = await JSON.parse(data);
      return await this.setState({
        error: undefined,
        loading: false,
        model: json,
      });
    } catch (error) {
      console.log(error);
      return await this.setState({
        error: error.message,
        loading: false,
      });
    }
  }
}

export default ModelContainer;
