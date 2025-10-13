'use client';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { PROJECT_QUERYResult } from '@/sanity.types';

type Step = NonNullable<NonNullable<PROJECT_QUERYResult>['steps']>[number];

interface StepItemProps extends Step {
  index: number;
}

function StepItem({ title, content, index }: StepItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref} className="relative border-l-2 pl-12 lg:pl-28 py-8">
      <motion.div
        className="absolute w-8 h-8 rounded-full top-[3.5rem] lg:top-[3.75rem] left-[-1.1rem] border-8"
        initial={{
          backgroundColor: 'hsl(var(--background))',
          opacity: 0.3,
        }}
        animate={
          isInView && {
            backgroundColor: 'hsl(var(--muted-foreground))',
            opacity: 1,
          }
        }
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      />
      <div>
        <motion.div
          className="flex justify-between items-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={
            isInView && {
              opacity: 1,
              y: 0,
            }
          }
          transition={{
            duration: 0.8,
            ease: [0.21, 0.45, 0.27, 0.9],
            delay: 0.6,
          }}
        >
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-sm text-muted-foreground">
            Step {index + 1}
          </span>
        </motion.div>
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView && {
                opacity: 1,
                y: 0,
              }
            }
            transition={{
              duration: 0.8,
              ease: [0.21, 0.45, 0.27, 0.9],
              delay: 0.7,
            }}
          >
            <PortableTextRenderer value={content} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ProjectStepsProps {
  steps: NonNullable<PROJECT_QUERYResult>['steps'];
}

export default function ProjectSteps({ steps }: ProjectStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <StepItem key={index} {...step} index={index} />
      ))}
    </div>
  );
}
