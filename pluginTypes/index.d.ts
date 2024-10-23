/// <amd-module name="@scom/scom-payment-widget/components/index.css.ts" />
declare module "@scom/scom-payment-widget/components/index.css.ts" {
    export const textCenterStyle: string;
    export const checkboxTextStyle: string;
    export const loadingImageStyle: string;
}
/// <amd-module name="@scom/scom-payment-widget/interface.ts" />
declare module "@scom/scom-payment-widget/interface.ts" {
    export interface IPaymentInfo {
        paymentId: string;
        amount: number;
        address?: string;
        provider?: PaymentProvider;
    }
    export enum PaymentType {
        Fiat = "Fiat",
        Crypto = "Crypto"
    }
    export enum PaymentProvider {
        Stripe = "Stripe",
        Paypal = "Paypal",
        TonWallet = "Ton Wallet",
        Metamask = "Metamask"
    }
    export interface IPaymentStatus {
        status: 'pending' | 'complete' | 'failed';
        receipt: string;
        provider: PaymentProvider;
        ownerAddress: string;
    }
    export interface INetworkConfig {
        chainName?: string;
        chainId: number;
    }
}
/// <amd-module name="@scom/scom-payment-widget/components/invoiceCreation.tsx" />
declare module "@scom/scom-payment-widget/components/invoiceCreation.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { IPaymentInfo } from "@scom/scom-payment-widget/interface.ts";
    interface ScomPaymentWidgetInvoiceCreationElement extends ControlElement {
        payment?: IPaymentInfo;
        onContinue?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scom-payment-widget--invoice-creation']: ScomPaymentWidgetInvoiceCreationElement;
            }
        }
    }
    export class InvoiceCreation extends Module {
        private lbAmount;
        private lbPaymentId;
        private checkboxAgree;
        private btnContinue;
        private _payment;
        onContinue: () => void;
        get payment(): IPaymentInfo;
        set payment(value: IPaymentInfo);
        constructor(parent?: Container, options?: ScomPaymentWidgetInvoiceCreationElement);
        private updateInfo;
        private handleCheckboxChanged;
        private handleContinue;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-payment-widget/assets.ts" />
declare module "@scom/scom-payment-widget/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-payment-widget/store.ts" />
declare module "@scom/scom-payment-widget/store.ts" {
    import { INetwork, IRpcWallet, IClientWallet } from "@ijstech/eth-wallet";
    import { PaymentProvider, PaymentType } from "@scom/scom-payment-widget/interface.ts";
    interface IExtendedNetwork extends INetwork {
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
    }
    export class State {
        rpcWalletId: string;
        networkMap: {
            [key: number]: IExtendedNetwork;
        };
        infuraId: string;
        constructor(options: any);
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): IRpcWallet;
        isRpcWalletConnected(): boolean;
        getNetworkInfo: (chainId: number) => IExtendedNetwork;
        getChainId(): number;
    }
    export function getClientWallet(): IClientWallet;
    export function isClientWalletConnected(): boolean;
    export const PaymentProviders: {
        provider: PaymentProvider;
        type: PaymentType;
        image: string;
    }[];
}
/// <amd-module name="@scom/scom-payment-widget/components/paymentMethod.tsx" />
declare module "@scom/scom-payment-widget/components/paymentMethod.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { IPaymentInfo, PaymentProvider } from "@scom/scom-payment-widget/interface.ts";
    interface ScomPaymentWidgetPaymentMethodElement extends ControlElement {
        payment?: IPaymentInfo;
        onSelectedPaymentProvider?: (paymentProvider: PaymentProvider) => void;
        onBack?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scom-payment-widget--payment-method']: ScomPaymentWidgetPaymentMethodElement;
            }
        }
    }
    export class PaymentMethod extends Module {
        private lbAmount;
        private lbPayMethod;
        private pnlPaymentType;
        private pnlPaymentMethod;
        private pnlMethodItems;
        private _payment;
        onSelectedPaymentProvider: (payment: IPaymentInfo, paymentProvider: PaymentProvider) => void;
        onBack: () => void;
        get payment(): IPaymentInfo;
        set payment(value: IPaymentInfo);
        constructor(parent?: Container, options?: ScomPaymentWidgetPaymentMethodElement);
        private updateAmount;
        private renderMethodItems;
        private handlePaymentType;
        private handlePaymentProvider;
        private handleBack;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-payment-widget/data.ts" />
declare module "@scom/scom-payment-widget/data.ts" {
    const _default_1: {
        infuraId: string;
        defaultData: {
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            tokens: {
                chainId: number;
                name: string;
                address: string;
                symbol: string;
                decimals: number;
            }[];
            wallets: {
                name: string;
            }[];
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-payment-widget/components/walletPayment.tsx" />
declare module "@scom/scom-payment-widget/components/walletPayment.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { INetworkConfig, IPaymentInfo, IPaymentStatus } from "@scom/scom-payment-widget/interface.ts";
    import { ITokenObject } from '@scom/scom-token-list';
    import { State } from "@scom/scom-payment-widget/store.ts";
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    interface ScomPaymentWidgetWalletPaymentElement extends ControlElement {
        wallets?: IWalletPlugin[];
        networks?: INetworkConfig[];
        tokens?: ITokenObject[];
        payment?: IPaymentInfo;
        onBack?: () => void;
        onPaid?: (paymentStatus: IPaymentStatus) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scom-payment-widget--wallet-payment']: ScomPaymentWidgetWalletPaymentElement;
            }
        }
    }
    export class WalletPayment extends Module {
        private pnlAmount;
        private pnlPayAmount;
        private lbAmount;
        private lbPayAmount;
        private imgPayToken;
        private pnlNetwork;
        private pnlWallet;
        private pnlTokens;
        private pnlTokenItems;
        private pnlPayDetail;
        private imgToken;
        private lbToAddress;
        private lbAmountToPay;
        private lbUSD;
        private btnBack;
        private btnPay;
        private imgWallet;
        private lbWallet;
        private imgCurrentWallet;
        private lbCurrentAddress;
        private imgCurrentNetwork;
        private lbCurrentNetwork;
        private payment;
        private _wallets;
        private _networks;
        private _tokens;
        private _state;
        private isInitialized;
        private isWalletConnected;
        private isToPay;
        private copyAddressTimer;
        private copyAmountTimer;
        private iconCopyAddress;
        private iconCopyAmount;
        onBack: () => void;
        onPaid: (paymentStatus: IPaymentStatus) => void;
        constructor(parent?: Container, options?: ScomPaymentWidgetWalletPaymentElement);
        get state(): State;
        set state(value: State);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get tokens(): ITokenObject[];
        set tokens(value: ITokenObject[]);
        onStartPayment(payment: IPaymentInfo): Promise<void>;
        private showFirstScreen;
        private updateAmount;
        private checkWalletStatus;
        private renderTokens;
        private handleConnectWallet;
        private handleShowNetworks;
        private handleSelectToken;
        private handleCopyAddress;
        private handleCopyAmount;
        private handlePay;
        private handleBack;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-payment-widget/components/statusPayment.tsx" />
declare module "@scom/scom-payment-widget/components/statusPayment.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { State } from "@scom/scom-payment-widget/store.ts";
    import { IPaymentStatus } from "@scom/scom-payment-widget/interface.ts";
    interface ScomPaymentWidgetStatusPaymentElement extends ControlElement {
        onClose?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scom-payment-widget--status-payment']: ScomPaymentWidgetStatusPaymentElement;
            }
        }
    }
    export class StatusPayment extends Module {
        private state;
        private receipt;
        private lbHeaderStatus;
        private imgHeaderStatus;
        private lbStatus;
        private imgStatus;
        private lbAddress;
        private imgWallet;
        private btnClose;
        onClose: () => void;
        constructor(parent?: Container, options?: ScomPaymentWidgetStatusPaymentElement);
        updateStatus(state: State, info: IPaymentStatus): void;
        private handleViewTransaction;
        private handleClose;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-payment-widget/components/index.ts" />
declare module "@scom/scom-payment-widget/components/index.ts" {
    import { InvoiceCreation } from "@scom/scom-payment-widget/components/invoiceCreation.tsx";
    import { PaymentMethod } from "@scom/scom-payment-widget/components/paymentMethod.tsx";
    import { WalletPayment } from "@scom/scom-payment-widget/components/walletPayment.tsx";
    import { StatusPayment } from "@scom/scom-payment-widget/components/statusPayment.tsx";
    export { InvoiceCreation, PaymentMethod, WalletPayment, StatusPayment };
}
/// <amd-module name="@scom/scom-payment-widget/index.css.ts" />
declare module "@scom/scom-payment-widget/index.css.ts" {
    export const dappContainerStyle: string;
}
/// <amd-module name="@scom/scom-payment-widget/telegramPayWidget.tsx" />
declare module "@scom/scom-payment-widget/telegramPayWidget.tsx" {
    import { Module, ControlElement, Container, IFont } from '@ijstech/components';
    type CreateInvoiceBody = {
        title: string;
        description: string;
        currency: string;
        photoUrl: string;
        payload: string;
        prices: {
            label: string;
            amount: number | string;
        }[];
    };
    interface ScomTelegramPayWidgetElement extends ControlElement {
        data?: CreateInvoiceBody;
        botAPIEndpoint: string;
        onPaymentSuccess: (status: string) => Promise<void>;
        payBtnCaption?: string;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-telegram-pay-widget']: ScomTelegramPayWidgetElement;
            }
        }
    }
    export class ScomTelegramPayWidget extends Module {
        private _invoiceData;
        private botAPIEndpoint;
        private onPaymentSuccess;
        private _payBtnCaption;
        private btnPayNow;
        constructor(parent?: Container, options?: any);
        get enabled(): boolean;
        set enabled(value: boolean);
        static create(options?: ScomTelegramPayWidgetElement, parent?: Container): Promise<ScomTelegramPayWidget>;
        clear(): void;
        init(): void;
        set invoiceData(data: CreateInvoiceBody);
        get invoiceData(): CreateInvoiceBody;
        set payBtnCaption(value: string);
        get payBtnCaption(): string;
        get font(): IFont;
        set font(value: IFont);
        private getInvoiceLink;
        private handlePayClick;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-payment-widget" />
declare module "@scom/scom-payment-widget" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { INetworkConfig, IPaymentInfo } from "@scom/scom-payment-widget/interface.ts";
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    import { ITokenObject } from "@scom/scom-token-list";
    import '@scom/scom-dapp-container';
    import { IRpcWallet } from '@ijstech/eth-wallet';
    import { ScomTelegramPayWidget } from "@scom/scom-payment-widget/telegramPayWidget.tsx";
    export { ScomTelegramPayWidget };
    interface ScomPaymentWidgetElement extends ControlElement {
        lazyLoad?: boolean;
        wallets?: IWalletPlugin[];
        networks?: INetworkConfig[];
        tokens?: ITokenObject[];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-payment-widget']: ScomPaymentWidgetElement;
            }
        }
    }
    export class ScomPaymentWidget extends Module {
        private state;
        private isInitialized;
        private invoiceCreation;
        private paymentMethod;
        private walletPayment;
        private statusPayment;
        private payment;
        private _wallets;
        private _networks;
        private _tokens;
        constructor(parent?: Container, options?: ScomPaymentWidgetElement);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get tokens(): ITokenObject[];
        set tokens(value: ITokenObject[]);
        get rpcWallet(): IRpcWallet;
        onStartPayment(payment: IPaymentInfo): void;
        init(): Promise<void>;
        render(): any;
    }
}
