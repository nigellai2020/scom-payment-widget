import { PaymentProvider, PaymentType } from "./interface";

export const STRIPE_LIB_URL = 'https://js.stripe.com/v3';

export async function getStripeKey(apiUrl: string) {
  let publishableKey: string;
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.publishableKey) {
        publishableKey = data.publishableKey;
      }
    }
  } catch (error) {
    console.log(error);
  }
  if (!publishableKey) {
    console.log('initStripePayment', 'Cannot get the publishable key');
  }
  return publishableKey;
}

export const PaymentProviders = [
  {
    provider: PaymentProvider.Stripe,
    type: PaymentType.Fiat,
    image: 'stripe.png'
  },
  {
    provider: PaymentProvider.TonWallet,
    type: PaymentType.Crypto,
    image: 'ton.png'
  },
  {
    provider: PaymentProvider.Metamask,
    type: PaymentType.Crypto,
    image: 'metamask.png'
  }
]

export const stripeCurrencies = [
  "aed", "afn", "all", "amd", "ang", "aoa", "ars", "aud", "awg", "azn",
  "bam", "bbd", "bdt", "bgn", "bhd", "bif", "bmd", "bnd", "bob", "brl",
  "bsd", "btn", "bwp", "byn", "byr", "bzd", "cad", "cdf", "chf", "clf",
  "clp", "cny", "cop", "crc", "cuc", "cup", "cve", "czk", "djf", "dkk",
  "dop", "dzd", "egp", "ern", "etb", "eur", "fjd", "fkp", "gbp", "gel",
  "ghs", "gip", "gmd", "gnf", "gtq", "gyd", "hkd", "hnl", "htg", "huf",
  "idr", "ils", "inr", "iqd", "irr", "isk", "jmd", "jod", "jpy", "kes",
  "kgs", "khr", "kmf", "kpw", "krw", "kwd", "kyd", "kzt", "lak", "lbp",
  "lkr", "lrd", "lsl", "ltl", "lvl", "lyd", "mad", "mdl", "mga", "mkd",
  "mmk", "mnt", "mop", "mro", "mur", "mvr", "mwk", "mxn", "myr", "mzn",
  "nad", "ngn", "nio", "nok", "npr", "nzd", "omr", "pab", "pen", "pgk",
  "php", "pkr", "pln", "pyg", "qar", "ron", "rsd", "rub", "rwf", "sar",
  "sbd", "scr", "sdg", "sek", "sgd", "shp", "skk", "sll", "sos", "srd",
  "ssp", "std", "svc", "syp", "szl", "thb", "tjs", "tmt", "tnd", "top",
  "try", "ttd", "twd", "tzs", "uah", "ugx", "usd", "uyu", "uzs", "vef",
  "vnd", "vuv", "wst", "xaf", "xag", "xau", "xcd", "xdr", "xof", "xpf",
  "yer", "zar", "zmk", "zmw", "btc", "jep", "eek", "ghc", "mtl", "tmm",
  "yen", "zwd", "zwl", "zwn", "zwr"
]

export const stripeZeroDecimalCurrencies = [
  "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga",
  "pyg", "rwf", "ugx", "vnd", "vuv", "xaf", "xof", "xpf"
]

export const stripeSpecialCurrencies = [
  'isk', 'huf', 'twd', 'ugx'
]

