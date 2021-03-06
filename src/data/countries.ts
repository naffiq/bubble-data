import ColorDifference from "../utils/ColorDifference";

interface FlatData {
  packageName: string;
  className: string;
  radius: number;
  density: string;
  color: string;
}

const colorDifference = new ColorDifference("#FFC51B", "#FF4817");

export function flatCountriesData(): { children: FlatData[] } {
  var classes = [];

  function recurse(name, node) {
    if (node.children)
      node.children.forEach(function(child) {
        recurse(node.name, child);
      });
    else {
      classes.push({
        packageName: name,
        name: node.name,
        population: node.population,
        density: node.density,
        color: colorDifference.percent(node.color)
      });
    }
  }

  recurse(null, countries);
  return { children: classes };
}

export const countries = {
  name: "Countries",
  children: [
    { name: "Burundi", population: 11179, density: "435.3", color: "50.5" },
    { name: "Comoros", population: 788, density: "423.7", color: "49.2" },
    { name: "Djibouti", population: 888, density: "38.3", color: "4.4" },
    { name: "Eritrea", population: 5228, density: "51.8", color: "6.0" },
    { name: "Ethiopia", population: 99391, density: "99.4", color: "11.5" },
    { name: "Kenya", population: 46050, density: "80.9", color: "9.4" },
    { name: "Madagascar", population: 24235, density: "41.7", color: "4.8" },
    { name: "Malawi", population: 17215, density: "182.6", color: "21.2" },
    { name: "Mauritius", population: 1273, density: "627.2", color: "72.8" },
    { name: "Mayotte", population: 240, density: "640.0", color: "74.3" },
    { name: "Mozambique", population: 27978, density: "35.6", color: "4.1" },
    { name: "R\u00e9union", population: 861, density: "344.5", color: "40.0" },
    { name: "Rwanda", population: 11610, density: "470.6", color: "54.6" },
    { name: "Seychelles", population: 96, density: "209.7", color: "24.3" },
    { name: "Somalia", population: 10787, density: "17.2", color: "2.0" },
    { name: "South Sudan", population: 12340, density: "20.2", color: "2.3" },
    { name: "Uganda", population: 39032, density: "195.3", color: "22.7" },
    {
      name: "United Republic of Tanzania",
      population: 53470,
      density: "60.4",
      color: "7.0"
    },
    { name: "Zambia", population: 16212, density: "21.8", color: "2.5" },
    { name: "Zimbabwe", population: 15603, density: "40.3", color: "4.7" },
    { name: "Angola", population: 25022, density: "20.1", color: "2.3" },
    { name: "Cameroon", population: 23344, density: "49.4", color: "5.7" },
    {
      name: "Central African Republic",
      population: 4900,
      density: "7.9",
      color: "0.9"
    },
    { name: "Chad", population: 14037, density: "11.1", color: "1.3" },
    { name: "Congo", population: 4620, density: "13.5", color: "1.6" },
    {
      name: "Democratic Republic of the Congo",
      population: 77267,
      density: "34.1",
      color: "4.0"
    },
    {
      name: "Equatorial Guinea",
      population: 845,
      density: "30.1",
      color: "3.5"
    },
    { name: "Gabon", population: 1725, density: "6.7", color: "0.8" },
    {
      name: "Sao Tome and Principe",
      population: 190,
      density: "198.3",
      color: "23.0"
    },
    { name: "Algeria", population: 39667, density: "16.7", color: "1.9" },
    { name: "Egypt", population: 91508, density: "91.9", color: "10.7" },
    { name: "Libya", population: 6278, density: "3.6", color: "0.4" },
    { name: "Morocco", population: 34378, density: "77.0", color: "8.9" },
    { name: "Sudan", population: 40235, density: "22.8", color: "2.6" },
    { name: "Tunisia", population: 11254, density: "72.4", color: "8.4" },
    { name: "Western Sahara", population: 573, density: "2.2", color: "0.3" },
    { name: "Botswana", population: 2262, density: "4.0", color: "0.5" },
    { name: "Lesotho", population: 2135, density: "70.3", color: "8.2" },
    { name: "Namibia", population: 2459, density: "3.0", color: "0.3" },
    { name: "South Africa", population: 54490, density: "44.9", color: "5.2" },
    { name: "Swaziland", population: 1287, density: "74.8", color: "8.7" },
    { name: "Benin", population: 10880, density: "96.5", color: "11.2" },
    { name: "Burkina Faso", population: 18106, density: "66.2", color: "7.7" },
    { name: "Cabo Verde", population: 521, density: "129.2", color: "15.0" },
    {
      name: "C\u00f4te d'Ivoire",
      population: 22702,
      density: "71.4",
      color: "8.3"
    },
    { name: "Gambia", population: 1991, density: "196.7", color: "22.8" },
    { name: "Ghana", population: 27410, density: "120.5", color: "14.0" },
    { name: "Guinea", population: 12609, density: "51.3", color: "6.0" },
    { name: "Guinea-Bissau", population: 1844, density: "65.6", color: "7.6" },
    { name: "Liberia", population: 4503, density: "46.8", color: "5.4" },
    { name: "Mali", population: 17600, density: "14.4", color: "1.7" },
    { name: "Mauritania", population: 4068, density: "3.9", color: "0.5" },
    { name: "Niger", population: 19899, density: "15.7", color: "1.8" },
    { name: "Nigeria", population: 182202, density: "200.1", color: "23.2" },
    { name: "Saint Helena", population: 4, density: "10.2", color: "1.2" },
    { name: "Senegal", population: 15129, density: "78.6", color: "9.1" },
    { name: "Sierra Leone", population: 6453, density: "89.4", color: "10.4" },
    { name: "Togo", population: 7305, density: "134.3", color: "15.6" },
    { name: "China", population: 1376049, density: "146.6", color: "17.0" },
    {
      name: "China, Hong Kong SAR",
      population: 7288,
      density: "6,940.9",
      color: "0.7"
    },
    {
      name: "China, Macao SAR",
      population: 588,
      density: "19,652.4",
      color: "2.2"
    },
    {
      name: "Dem. People's Republic of Korea",
      population: 25155,
      density: "208.9",
      color: "24.2"
    },
    { name: "Japan", population: 126573, density: "347.2", color: "40.3" },
    { name: "Mongolia", population: 2959, density: "1.9", color: "0.2" },
    {
      name: "Republic of Korea",
      population: 50293,
      density: "517.3",
      color: "60.0"
    },
    {
      name: "Other non-specified areas",
      population: 23381,
      density: "660.3",
      color: "76.6"
    },
    { name: "Kazakhstan", population: 17625, density: "6.5", color: "0.8" },
    { name: "Kyrgyzstan", population: 5940, density: "31.0", color: "3.6" },
    { name: "Tajikistan", population: 8482, density: "60.6", color: "7.0" },
    { name: "Turkmenistan", population: 5374, density: "11.4", color: "1.3" },
    { name: "Uzbekistan", population: 29893, density: "70.3", color: "8.2" },
    { name: "Afghanistan", population: 32527, density: "49.8", color: "5.8" },
    {
      name: "Bangladesh",
      population: 160996,
      density: "1,236.8",
      color: "0.1"
    },
    { name: "Bhutan", population: 775, density: "20.3", color: "2.4" },
    { name: "India", population: 1311051, density: "441.0", color: "51.2" },
    {
      name: "Iran (Islamic Republic of)",
      population: 79109,
      density: "48.6",
      color: "5.6"
    },
    { name: "Maldives", population: 364, density: "1,212.2", color: "0.1" },
    { name: "Nepal", population: 28514, density: "198.9", color: "23.1" },
    { name: "Pakistan", population: 188925, density: "245.1", color: "28.5" },
    { name: "Sri Lanka", population: 20715, density: "330.3", color: "38.3" },
    {
      name: "Brunei Darussalam",
      population: 423,
      density: "80.3",
      color: "9.3"
    },
    { name: "Cambodia", population: 15578, density: "88.3", color: "10.2" },
    { name: "Indonesia", population: 257564, density: "142.2", color: "16.5" },
    {
      name: "Lao People's Democratic Republic",
      population: 6802,
      density: "29.5",
      color: "3.4"
    },
    { name: "Malaysia", population: 30331, density: "92.3", color: "10.7" },
    { name: "Myanmar", population: 53897, density: "82.5", color: "9.6" },
    {
      name: "Philippines",
      population: 100699,
      density: "337.7",
      color: "39.2"
    },
    { name: "Singapore", population: 5604, density: "8,005.3", color: "0.9" },
    { name: "Thailand", population: 67959, density: "133.0", color: "15.4" },
    { name: "Timor-Leste", population: 1185, density: "79.7", color: "9.3" },
    { name: "Viet Nam", population: 93448, density: "301.4", color: "35.0" },
    { name: "Armenia", population: 3018, density: "106.0", color: "12.3" },
    { name: "Azerbaijan", population: 9754, density: "118.0", color: "13.7" },
    { name: "Bahrain", population: 1377, density: "1,812.2", color: "0.1" },
    { name: "Cyprus", population: 1165, density: "126.1", color: "14.6" },
    { name: "Georgia", population: 4000, density: "57.6", color: "6.7" },
    { name: "Iraq", population: 36423, density: "83.9", color: "9.7" },
    { name: "Israel", population: 8064, density: "372.6", color: "43.3" },
    { name: "Jordan", population: 7595, density: "85.5", color: "9.9" },
    { name: "Kuwait", population: 3892, density: "218.4", color: "25.4" },
    { name: "Lebanon", population: 5851, density: "571.9", color: "66.4" },
    { name: "Oman", population: 4491, density: "14.5", color: "1.7" },
    { name: "Qatar", population: 2235, density: "192.5", color: "22.3" },
    { name: "Saudi Arabia", population: 31540, density: "14.7", color: "1.7" },
    {
      name: "State of Palestine",
      population: 4668,
      density: "775.5",
      color: "90.0"
    },
    {
      name: "Syrian Arab Republic",
      population: 18502,
      density: "100.8",
      color: "11.7"
    },
    { name: "Turkey", population: 78666, density: "102.2", color: "11.9" },
    {
      name: "United Arab Emirates",
      population: 9157,
      density: "109.5",
      color: "12.7"
    },
    { name: "Yemen", population: 26832, density: "50.8", color: "5.9" },
    { name: "Belarus", population: 9496, density: "46.8", color: "5.4" },
    { name: "Bulgaria", population: 7150, density: "65.9", color: "7.6" },
    {
      name: "Czech Republic",
      population: 10543,
      density: "136.5",
      color: "15.8"
    },
    { name: "Hungary", population: 9855, density: "108.9", color: "12.6" },
    { name: "Poland", population: 38612, density: "126.1", color: "14.6" },
    {
      name: "Republic of Moldova",
      population: 4069,
      density: "123.9",
      color: "14.4"
    },
    { name: "Romania", population: 19511, density: "84.8", color: "9.8" },
    {
      name: "Russian Federation",
      population: 143457,
      density: "8.8",
      color: "1.0"
    },
    { name: "Slovakia", population: 5426, density: "112.8", color: "13.1" },
    { name: "Ukraine", population: 44824, density: "77.4", color: "9.0" },
    {
      name: "Channel Islands",
      population: 164,
      density: "861.5",
      color: "100.0"
    },
    { name: "Denmark", population: 5669, density: "133.6", color: "15.5" },
    { name: "Estonia", population: 1313, density: "31.0", color: "3.6" },
    { name: "Faeroe Islands", population: 48, density: "34.5", color: "4.0" },
    { name: "Finland", population: 5503, density: "18.1", color: "2.1" },
    { name: "Iceland", population: 329, density: "3.3", color: "0.4" },
    { name: "Ireland", population: 4688, density: "68.1", color: "7.9" },
    { name: "Isle of Man", population: 88, density: "154.0", color: "17.9" },
    { name: "Latvia", population: 1971, density: "31.7", color: "3.7" },
    { name: "Lithuania", population: 2878, density: "45.9", color: "5.3" },
    { name: "Norway", population: 5211, density: "14.3", color: "1.7" },
    { name: "Sweden", population: 9779, density: "23.8", color: "2.8" },
    {
      name: "United Kingdom",
      population: 64716,
      density: "267.5",
      color: "31.1"
    },
    { name: "Albania", population: 2897, density: "105.7", color: "12.3" },
    { name: "Andorra", population: 70, density: "149.9", color: "17.4" },
    {
      name: "Bosnia and Herzegovina",
      population: 3810,
      density: "74.7",
      color: "8.7"
    },
    { name: "Croatia", population: 4240, density: "75.8", color: "8.8" },
    { name: "Gibraltar", population: 32, density: "3,221.7", color: "0.3" },
    { name: "Greece", population: 10955, density: "85.0", color: "9.9" },
    { name: "Holy See", population: 1, density: "1,818.2", color: "0.1" },
    { name: "Italy", population: 59798, density: "203.3", color: "23.6" },
    { name: "Malta", population: 419, density: "1,308.3", color: "0.1" },
    { name: "Montenegro", population: 626, density: "46.5", color: "5.4" },
    { name: "Portugal", population: 10350, density: "113.0", color: "13.1" },
    { name: "San Marino", population: 32, density: "529.7", color: "61.5" },
    { name: "Serbia", population: 8851, density: "101.2", color: "11.7" },
    { name: "Slovenia", population: 2068, density: "102.7", color: "11.9" },
    { name: "Spain", population: 46122, density: "92.5", color: "10.7" },
    { name: "TFYR Macedonia", population: 2078, density: "82.4", color: "9.6" },
    { name: "Austria", population: 8545, density: "103.7", color: "12.0" },
    { name: "Belgium", population: 11299, density: "373.2", color: "43.3" },
    { name: "France", population: 64395, density: "117.6", color: "13.7" },
    { name: "Germany", population: 80689, density: "231.5", color: "26.9" },
    { name: "Liechtenstein", population: 38, density: "234.6", color: "27.2" },
    { name: "Luxembourg", population: 567, density: "219.0", color: "25.4" },
    { name: "Monaco", population: 38, density: "25,322.8", color: "2.9" },
    { name: "Netherlands", population: 16925, density: "501.9", color: "58.3" },
    { name: "Switzerland", population: 8299, density: "210.0", color: "24.4" },
    { name: "Anguilla", population: 15, density: "162.4", color: "18.9" },
    {
      name: "Antigua and Barbuda",
      population: 92,
      density: "208.7",
      color: "24.2"
    },
    { name: "Aruba", population: 104, density: "577.2", color: "67.0" },
    { name: "Bahamas", population: 388, density: "38.8", color: "4.5" },
    { name: "Barbados", population: 284, density: "661.0", color: "76.7" },
    {
      name: "British Virgin Islands",
      population: 30,
      density: "200.8",
      color: "23.3"
    },
    {
      name: "Caribbean Netherlands",
      population: 25,
      density: "75.8",
      color: "8.8"
    },
    { name: "Cayman Islands", population: 60, density: "249.9", color: "29.0" },
    { name: "Cuba", population: 11390, density: "107.0", color: "12.4" },
    { name: "Cura\u00e7ao", population: 157, density: "354.1", color: "41.1" },
    { name: "Dominica", population: 73, density: "96.9", color: "11.2" },
    {
      name: "Dominican Republic",
      population: 10528,
      density: "217.9",
      color: "25.3"
    },
    { name: "Grenada", population: 107, density: "314.2", color: "36.5" },
    { name: "Guadeloupe", population: 468, density: "277.2", color: "32.2" },
    { name: "Haiti", population: 10711, density: "388.6", color: "45.1" },
    { name: "Jamaica", population: 2793, density: "257.9", color: "29.9" },
    { name: "Martinique", population: 396, density: "374.0", color: "43.4" },
    { name: "Montserrat", population: 5, density: "51.3", color: "6.0" },
    { name: "Puerto Rico", population: 3683, density: "415.2", color: "48.2" },
    {
      name: "Saint Kitts and Nevis",
      population: 56,
      density: "213.7",
      color: "24.8"
    },
    { name: "Saint Lucia", population: 185, density: "303.3", color: "35.2" },
    {
      name: "Saint Vincent and the Grenadines",
      population: 109,
      density: "280.7",
      color: "32.6"
    },
    {
      name: "Sint Maarten (Dutch part)",
      population: 39,
      density: "1,139.6",
      color: "0.1"
    },
    {
      name: "Trinidad and Tobago",
      population: 1360,
      density: "265.1",
      color: "30.8"
    },
    {
      name: "Turks and Caicos Islands",
      population: 34,
      density: "36.1",
      color: "4.2"
    },
    {
      name: "United States Virgin Islands",
      population: 106,
      density: "303.7",
      color: "35.3"
    },
    { name: "Belize", population: 359, density: "15.8", color: "1.8" },
    { name: "Costa Rica", population: 4808, density: "94.2", color: "10.9" },
    { name: "El Salvador", population: 6127, density: "295.7", color: "34.3" },
    { name: "Guatemala", population: 16343, density: "152.5", color: "17.7" },
    { name: "Honduras", population: 8075, density: "72.2", color: "8.4" },
    { name: "Mexico", population: 127017, density: "65.3", color: "7.6" },
    { name: "Nicaragua", population: 6082, density: "50.5", color: "5.9" },
    { name: "Panama", population: 3929, density: "52.9", color: "6.1" },
    { name: "Argentina", population: 43417, density: "15.9", color: "1.8" },
    {
      name: "Bolivia (Plurinational State of)",
      population: 10725,
      density: "9.9",
      color: "1.1"
    },
    { name: "Brazil", population: 207848, density: "24.9", color: "2.9" },
    { name: "Chile", population: 17948, density: "24.1", color: "2.8" },
    { name: "Colombia", population: 48229, density: "43.5", color: "5.0" },
    { name: "Ecuador", population: 16144, density: "65.0", color: "7.5" },
    {
      name: "Falkland Islands (Malvinas)",
      population: 3,
      density: "0.2",
      color: "0.0"
    },
    { name: "French Guiana", population: 269, density: "3.3", color: "0.4" },
    { name: "Guyana", population: 767, density: "3.9", color: "0.5" },
    { name: "Paraguay", population: 6639, density: "16.7", color: "1.9" },
    { name: "Peru", population: 31377, density: "24.5", color: "2.8" },
    { name: "Suriname", population: 543, density: "3.5", color: "0.4" },
    { name: "Uruguay", population: 3432, density: "19.6", color: "2.3" },
    {
      name: "Venezuela (Bolivarian Republic of)",
      population: 31108,
      density: "35.3",
      color: "4.1"
    },
    { name: "Bermuda", population: 62, density: "1,240.1", color: "0.1" },
    { name: "Canada", population: 35940, density: "4.0", color: "0.5" },
    { name: "Greenland", population: 56, density: "0.1", color: "0.0" },
    {
      name: "Saint Pierre and Miquelon",
      population: 6,
      density: "27.3",
      color: "3.2"
    },
    {
      name: "United States of America",
      population: 321774,
      density: "35.2",
      color: "4.1"
    },
    { name: "Australia", population: 23969, density: "3.1", color: "0.4" },
    { name: "New Zealand", population: 4529, density: "17.2", color: "2.0" },
    { name: "Fiji", population: 892, density: "48.8", color: "5.7" },
    { name: "New Caledonia", population: 263, density: "14.4", color: "1.7" },
    {
      name: "Papua New Guinea",
      population: 7619,
      density: "16.8",
      color: "2.0"
    },
    { name: "Solomon Islands", population: 584, density: "20.8", color: "2.4" },
    { name: "Vanuatu", population: 265, density: "21.7", color: "2.5" },
    { name: "Guam", population: 170, density: "314.6", color: "36.5" },
    { name: "Kiribati", population: 112, density: "138.8", color: "16.1" },
    {
      name: "Marshall Islands",
      population: 53,
      density: "294.4",
      color: "34.2"
    },
    {
      name: "Micronesia (Fed. States of)",
      population: 104,
      density: "149.2",
      color: "17.3"
    },
    { name: "Nauru", population: 10, density: "511.1", color: "59.3" },
    {
      name: "Northern Mariana Islands",
      population: 55,
      density: "119.7",
      color: "13.9"
    },
    { name: "Palau", population: 21, density: "46.3", color: "5.4" },
    { name: "American Samoa", population: 56, density: "277.7", color: "32.2" },
    { name: "Cook Islands", population: 21, density: "86.8", color: "10.1" },
    {
      name: "French Polynesia",
      population: 283,
      density: "77.3",
      color: "9.0"
    },
    { name: "Niue", population: 2, density: "6.2", color: "0.7" },
    { name: "Samoa", population: 193, density: "68.3", color: "7.9" },
    { name: "Tokelau", population: 1, density: "125.0", color: "14.5" },
    { name: "Tonga", population: 106, density: "147.5", color: "17.1" },
    { name: "Tuvalu", population: 10, density: "330.5", color: "38.4" },
    {
      name: "Wallis and Futuna Islands",
      population: 13,
      density: "93.9",
      color: "10.9"
    }
  ]
};
