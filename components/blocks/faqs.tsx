import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { PAGE_QUERYResult } from '@/sanity.types';

type FAQProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'faqs' }
>;

export default function FAQs({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  faqs,
}: FAQProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          'space-y-8',
          isNarrow ? 'max-w-[48rem] mx-auto' : undefined
        )}
      >
        {(title || tagLine || description) && (
          <div
            className={cn(
              align === 'center'
                ? 'max-w-[48rem] text-center mx-auto'
                : undefined
            )}
          >
            <div
              className={cn(
                color === 'primary' ? 'text-background' : undefined
              )}
            >
              {tagLine && (
                <h1 className="leading-[0] mb-4">
                  <span className="text-base font-semibold">{tagLine}</span>
                </h1>
              )}
              {title && <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>}
            </div>
            {description && <p>{description}</p>}
          </div>
        )}
        {faqs && faqs?.length > 0 && (
          <Accordion className="space-y-4" type="multiple">
            {faqs.map((faq) => (
              <AccordionItem key={faq.title} value={`item-${faq._id}`}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>
                  <PortableTextRenderer value={faq.body || []} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </SectionContainer>
  );
}
