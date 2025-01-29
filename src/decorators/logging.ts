type AsyncFunction = (...args: unknown[]) => Promise<void>;

export function LogExecution(
  target: Record<string, unknown>,
  propertyKey: string,
  descriptor?: TypedPropertyDescriptor<AsyncFunction>,
): TypedPropertyDescriptor<AsyncFunction> | void {
  if (!descriptor || typeof descriptor.value !== 'function') {
    throw new Error('Only methods can be decorated with @LogExecution');
  }

  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: unknown[]): Promise<void> {
    console.log(`Executing ${propertyKey}...`);
    const result = await originalMethod.apply(this, args);
    console.log(`${propertyKey} executed successfully.`);
    return result;
  };

  return descriptor;
}
