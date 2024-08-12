import { style } from '@vanilla-extract/css';

export const actionButtonLabel = style({
  fontSize:
    'var(--spectrum-fieldlabel-text-size, var(--spectrum-global-dimension-font-size-75))',
  lineHeight:
    'var(--spectrum-fieldlabel-text-line-height, var(--spectrum-global-font-line-height-small))',
  color:
    'var(--spectrum-fieldlabel-text-color, var(--spectrum-alias-label-text-color))',
  paddingTop:
    'var(--spectrum-fieldlabel-padding-top, var(--spectrum-global-dimension-size-50))',
  paddingBottom: `calc(
      var(--spectrum-fieldlabel-padding-bottom, var(--spectrum-global-dimension-size-65))
     )`,
});
