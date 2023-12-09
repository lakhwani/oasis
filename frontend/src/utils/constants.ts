export const mainContractAddress = "0x2aD949E84aed142b4eF4b90E1812296E00A6B1F7";

export const mainContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DonationMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "RequestMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "RequestProcessed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "address",
        name: "verifiedWallet",
        type: "address",
      },
    ],
    name: "addVerifiedWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_bytes32",
        type: "bytes32",
      },
    ],
    name: "bytes32ToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
      {
        internalType: "string",
        name: "apiKey",
        type: "string",
      },
    ],
    name: "checkForPayout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "result",
        type: "bytes32",
      },
    ],
    name: "fulfill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "makeDonation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
    ],
    name: "performPayout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const partners = [
  {
    name: "GiveDirectly",
    type: "Nonprofit Organsation",
    description:
      "A nonprofit organization empowering people in poverty through direct cash transfers, allowing them to choose the best ways to improve their lives, with over $700 million delivered to 1.5 million people.",
    founded: 2008.0,
    country:
      "Bangladesh, DRC, Kenya, Liberia, Malawi, Mozambique, Morocco, Nigeria, Rwanda, Turkey, Uganda, USA, and Yemen",
    city: "Various",
    country_code: "BGD, COD, KEN, LBR, MWI, MOZ, MAR, NGA, RWA, TUR, UGA, USA",
    continent_codes: "afr, asia, eur, nar",
    link: "https://www.givedirectly.org/crypto/",
    address: "0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C",
    note: "Mainly poverty based, but have emergency relief arm.",
  },
  {
    name: "Give Crypto",
    type: "Nonprofit Organsation",
    description:
      "A nonprofit distributing cryptocurrency to people in poverty, aiming to financially empower individuals by connecting donors and recipients worldwide, especially in areas without traditional banking access.",
    founded: 2018.0,
    country: "Peru, Venezuela, DRC",
    city: "Various",
    country_code: "PER, VEN, COD",
    continent_codes: "afr, sar",
    link: "https://givecrypto.org/",
    address: "0xe7feef0f078811fa6c4a5f708e833eb61302f67f",
    note: "Made by CEO of Coinbase.",
  },
  {
    name: "Save the Children",
    type: "International Non-Governmental Organization (NGO)",
    description:
      "An international NGO dedicated to improving children's lives through better education, healthcare, and economic opportunities, advocating for children's rights and providing aid in times of need.",
    founded: 1932.0,
    country:
      "Burkina Faso, Democratic Republic of Congo, Egypt, Ethiopia, Kenya, Malawi, Mali, Mozambique, Niger, Nigeria, Rwanda, Sierra Leone, Somalia, South Sudan, Sudan, Tanzania, Uganda, Zambia, Zimbabwe, Afghanistan, Bangladesh, Bhutan, Cambodia, China, India, Indonesia, Iraq, Jordan, Laos, Lebanon, Myanmar, Nepal, Pakistan, Philippines, Syria, Thailand, T\u00fcrkiye, Vietnam, West Bank, Yemen, Ukraine, Dominican Republic, El Salvador, Guatemala, Haiti, Honduras, Mexico, Nicaragua, United States, Bolivia, Colombia, Venezuela.",
    city: "Various",
    country_codes:
      "BFA, COD, EGY, ETH, KEN, MWI, MLI, MOZ, NER, NGA, RRWA, SKE, SOM, SSD, SDN, TZA, UGA, ZMB, ZWE, AFG, BGD, BTN, KHM, CHN, IND, IDN, IRQ, JOR, LAO, KBN, MMR, NPL, PAK, PHL, SYR, THA, TUR, VNM, PSE, YEM, UKR, DOM, SLV, GTM, HTI, HND, MEX, NIC, USA, BOL, COL, VEN",
    continent_codes: "afr, eur, nar, sar",
    link: "https://support.savethechildren.org/site/SPageNavigator/donation__crypto.html",
    address: "0x4aAb2278a1325cFdbDF389e0664D100c74B95cf5",
    note: "Mainly children focused, also work on disaster relief",
  },
  {
    name: "Direct Relief",
    type: "Nonprofit Organsation",
    description:
      "A humanitarian aid organization that provides medical assistance to people affected by poverty or emergencies globally, focusing on efficient delivery of medical resources and commitment to impartial aid.",
    founded: 1948.0,
    country:
      "Angola, Benin, Botswana, Burkina Faso, Burundi, Cameroon, Chad, C\u00f4te d\u2019Ivoire, Democratic Republic of Congo, Djibouti, Egypt, Eritrea, Eswatini, Ethiopia, Gambia, Ghana, Guinea, Kenya, Lesotho, Liberia, Madagascar, Malawi, Mali, Mauritania, Morocco, Mozambique, Namibia, Niger, Nigeria, Rwanda, Senegal, Sierra Leone, Somalia, Somaliland, South Africa, South Sudan, Sudan, Tanzania, Togo, Tunisia, Uganda, Zimbabwe, Afghanistan, Armenia, Bangladesh, Cambodia, China, India, Indonesia, Iraq, Israel, Japan, Jordan, Laos, Lebanon, Malaysia, Mongolia, Myanmar, Nepal, Pakistan, Palestinian Territories, Philippines, Sri Lanka, Syria, Tajikistan, Thailand, Turkey, Vietnam, Yemen, Anguilla, Antigua and Barbuda, Barbados, Belize, Cuba, Dominica, Dominican Republic, El Salvador, Guatemala, Haiti, Honduras, Jamaica, Netherlands Antilles, Nicaragua, Panama, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines, The Bahamas, Turks and Caicos Islands, Virgin Islands (British), Albania, Belarus, Bosnia and Herzegovina, Greece, Italy, Kosovo, Moldova, North Macedonia, Poland, Romania, Slovakia, Spain, Ukraine, Mexico, United States, Australia, Fiji, Marshall Islands, Micronesia (Federated States of), Nauru, New Zealand, Papua New Guinea, Samoa, Solomon Islands, Tonga, Vanuatu, Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname",
    city: "Various",
    country_codes:
      "AGO, BEN, BWA, BFA, BDI, CMR, TCD, CIV, COD, DJI, EGY, ERI, SWZ, ETH, GMB, GHA, GIN, KEN, LSO, LBR, MDG, MWI, MLI, MRT, MAR, MOZ, NAM, NER, NGA, RWA, SEN, SLE, SOM, SOL, ZAF, SSD, SDN, TZA, TGO, TUN, UGA, ZWE, AFG, ARM, BGD, KHM, CHN, IND, IDN, IRQ, ISR, JPN, JOR, LAO, LBN, MYS, MNG, MMR, NPL, PAK, PSE, PHL, LKA, SYR, TJK, THA, TUR, VNM, YEM, AIA, ATG, BRB, BLZ, CUB, DMA, DOM, SLV, GTM, HTI, HND, JAM, ANT, NIC, PAN, KNA, LCA, VCT, BHS, TCA, VGB, ALB, BLR, BIH, GRC, ITA, RKS, MDA, MKD, POL, ROU, SVK, ESP, UKR, MEX, USA, AUS, FJI, MHL, FSM, NRU, NZL, PNG, WSM, SLB, TON, VUT, ARG, BOL, BRA, CHL, COL, ECU, GUY, PRY, PER, SUR.",
    continent_codes: "afr, eur, nar, sar, aus, ocean",
    link: "https://www.directrelief.org/get-involved/donate-crypto/#:~:text=Direct%20Relief%20accepts%20donations%20of,)%2C%201inch%20(1INCH).",
    address: "0x5a3f50eF47586fcb972c65D76631b7CF827CD5D4",
    note: "",
  },
  {
    name: "GRACEaid",
    type: "Charity",
    description:
      "A charity supporting refugees, asylum seekers, and survivors of trafficking and abuse by providing essential daily items, operating through a charity shop and a voucher scheme, and adapting to challenges like COVID-19 and Brexit.",
    founded: 2015.0,
    country: "UK based",
    city: "Various",
    country_codes: "GBR",
    continent_codes: "eur",
    link: "https://www.graceaid.org.uk/\n\nhttps://github.com/GRACEaid/Refugee-Smart-Contract/blob/master/README.md",
    address: "0xc1D5FD1F0D969075040988e37Df3643Af724995D",
    note: "Clothing and food donation for refugees, asylum seekers, etc.",
  },
];
