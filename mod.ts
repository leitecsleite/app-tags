import type { App, FnContext } from "@deco/deco";
import { fetchSafe } from "apps/utils/fetch.ts";
import { createHttpClient } from "apps/utils/http.ts";
import { PreviewContainer } from "apps/utils/preview.tsx";
import type { Secret } from "apps/website/loaders/secret.ts";
import manifest, { Manifest } from "./manifest.gen.ts";
import { ClientInterfaceExample } from "./utils/client.ts";
import { Color } from "apps/admin/widgets.ts";

export type AppContext = FnContext<State, Manifest>;

export interface FlagCustomProps {
  /**@title ID da Coleção */
  /** @description ex: 927 */
  idCollection: string;
  /**@title Nome do Desconto Lado Direito */
  /** @description ex: de graça */
  textRight: string;
  /**@title Cor do Texto Lado Direito */
  /** @description ex: #FFF */
  textRightColor: Color;
  /**@title Cor de Fundo Lado Direito */
  /** @description ex: #D50202 */
  textRightBackgroundColor: Color;
  /**@title Nome do Desconto Lado Esquerdo */
  /** @description Este lado é opcional ex: 3ª peça por */
  textLeft?: string;
  /**@title Cor do Texto Lado Esquerdo */
  /** @description ex: #FFF */
  textLeftColor: Color;
  /**@title Cor de Fundo Lado Esquerdo */
  /** @description ex: #720303 */
  textLeftBackgroundColor: Color;
  /**@title Ativar a Flag Personalizada */
  showFlagCustom: boolean;
  /** @hide true */
  type?: "ProductDetails" | "ProductShelf";
}

export interface FlagDiscountThirdForProps {
  /**@title ID da Coleção */
  /** @description ex: 613 */
  idCollection: string;
  /**@title Valor da Porcentagem */
  /** @description ex: 70 */
  discountPercentage: number;
  /**@title Cor de Fundo do Preço */
  /** @description ex: #585857 */
  priceBackgroundColor: Color;
  /**@title Cor do Preço */
  /** @description ex: #FFF */
  priceColor: Color;
  /**@title Texto */
  /** @description ex: 3ª peça por */
  text: string;
  /**@title Cor de Fundo do Texto */
  /** @description ex: #8D8D8D */
  textBackgroundColor: Color;
  /**@title Cor do Texto */
  /** @description ex: #FFF */
  textColor: Color;
  /**@title Ativar a Flag Desconto na Terceira Compra */
  showFlagDiscountThirdFor: boolean;
}

export interface Props {
  /**
   * @title Flag Desconto na terceira compra
   */
  flagDiscountThirdFor?: FlagDiscountThirdForProps;

  /**@title Flag Personalizada */
  flagCustom?: FlagCustomProps;

  /**
   * @title Account Name
   * @description erploja2 etc
   */
  account: string;

  /**
   * @title API token
   * @description The token for accessing your API
   */
  token?: Secret;
}

// Here we define the state of the app
// You choose what to put in the state
export interface State extends Omit<Props, "token"> {
  api: ReturnType<typeof createHttpClient<ClientInterfaceExample>>;
}

/**
 * @title App Template
 * @description This is an template of an app to be used as a reference.
 * @category Tools
 * @logo https://
 */
export default function App(props: Props): App<Manifest, State> {
  const { token, account: _account } = props;

  const _stringToken = typeof token === "string" ? token : token?.get?.() ?? "";

  const api = createHttpClient<ClientInterfaceExample>({
    base: `https://api.github.com/users/guitavano`,
    // headers: new Headers({ "Authorization": `Bearer ${stringToken}` }),
    fetcher: fetchSafe,
  });

  // it is the state of the app, all data
  // here will be available in the context of
  // loaders, actions and workflows
  const state = { ...props, api };

  return {
    state,
    manifest,
  };
}

// It is important to use the same name as the default export of the app
export const preview = () => {
  return {
    Component: PreviewContainer,
    props: {
      name: "App Tags",
      owner: "Lucas Leite",
      description: "This is an template of an app to be used as a reference.",
      logo:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8",
      images: [],
      tabs: [],
    },
  };
};
