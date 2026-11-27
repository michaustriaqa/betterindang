export interface Hotline {
  labelKey: string;
  number: string;
  tel: string;
}

/** Emergency numbers shown in the top bar and on the Contact page. */
export const HOTLINES: Hotline[] = [
  { labelKey: 'hotlines.mdrrmo', number: '0961-992-1998', tel: '09619921998' },
  { labelKey: 'hotlines.fire', number: '046-415-1217', tel: '0464151217' },
  { labelKey: 'hotlines.police', number: '0949-184-9145', tel: '09491849145' },
  { labelKey: 'hotlines.hospital', number: '046-840-1705', tel: '0468401705' },
];
