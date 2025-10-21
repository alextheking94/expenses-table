export const formatMoneyUSD = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString('en-US', { dateStyle: 'medium' });
