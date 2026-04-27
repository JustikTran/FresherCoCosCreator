export function SingletonComponent<T extends { new(...args: any[]): any }>(constructor: T) {
    return class extends constructor {
        private static _instance: any;

        onLoad() {
            if ((constructor as any)._instance) {
                this.node.destroy();
                return;
            }
            (constructor as any)._instance = this;
        }

        public static getInstance(): InstanceType<T> {
            return (constructor as any)._instance;
        }
    };
}
