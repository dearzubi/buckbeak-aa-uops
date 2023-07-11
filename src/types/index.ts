import { BigNumberish, BytesLike } from "ethers";

export interface IUserOperation {
  sender: string;
  nonce: number;
  initCode: BytesLike;
  callData: BytesLike;
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymasterAndData: BytesLike;
  signature: BytesLike;
}

export type UserOpMiddlewareFn = (userOp: IUserOperation) => Promise<void>;

export interface IClassUserOP<T>{
  clear(): T;
  resetToDefault(): T;
  setSender(sender: string): T;
  setNonce(nonce: BigNumberish): T;
  setInitCode(initCode: BytesLike): T;
  setCallData(callData: BytesLike): T;
  setCallGasLimit(callGasLimit: BigNumberish): T;
  setVerificationGasLimit(verificationGasLimit: BigNumberish): T;
  setPreVerificationGas(preVerificationGas: BigNumberish): T;
  setMaxFeePerGas(maxFeePerGas: BigNumberish): T;
  setMaxPriorityFeePerGas(maxPriorityFeePerGas: BigNumberish): T;
  setPaymasterAndData(paymasterAndData: BytesLike): T;
  setSignature(signature: BytesLike): T;
  updateDefaults(userOp: Partial<IUserOperation>): T
  update(userOp: Partial<IUserOperation>): T;
  copy(userOpObj: T): T; 
  setMiddleware(middleware: UserOpMiddlewareFn): T;
  executeMiddlewares(): Promise<T>;
  getSender(): string;
  getNonce(): number;
  getInitCode(): BytesLike;
  getCallData(): BytesLike;
  getCallGasLimit(): bigint;
  getVerificationGasLimit(): bigint;
  getPreVerificationGas(): bigint;
  getMaxFeePerGas(): bigint;
  getMaxPriorityFeePerGas(): bigint;
  getPaymasterAndData(): BytesLike;
  getSignature(): BytesLike;
  get(): IUserOperation;
  getDefaults(): IUserOperation;
  toJSON(): {[key: string]: string};
}
