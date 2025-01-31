type MethodDecoratorType = (
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;

export function LogExecution(): MethodDecoratorType {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as (
      ...args: unknown[]
    ) => Promise<unknown>;

    const newDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: descriptor.enumerable,
      writable: true,
      value: async function (...args: unknown[]) {
        try {
          console.log(`Starting execution of ${propertyKey}`);
          const result = await originalMethod.apply(this, args);
          console.log(`Successfully completed ${propertyKey}`);
          return result;
        } catch (error) {
          console.error(`Error in ${propertyKey}:`, error);
          throw error;
        }
      },
    };

    return newDescriptor;
  };
}
