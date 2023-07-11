import {ethers} from "ethers";
import {DEFAULT_USER_OP} from "./constants";
import {IClassUserOP, IUserOperation, UserOpMiddlewareFn} from "types";

export default class UserOp implements IClassUserOP<UserOp> {

  private defaultUserOp: IUserOperation;
  private userOp: IUserOperation;
  private middlewares: UserOpMiddlewareFn[] = [];

  constructor(userOP?: IUserOperation) {
    if (userOP) {
      this.defaultUserOp = {...DEFAULT_USER_OP, ...UserOp.resolveFields(userOP)};
    }
    else {
      this.defaultUserOp = {...DEFAULT_USER_OP};
    }
    this.userOp = {...this.defaultUserOp}
  }

  static resolveFields(op: Partial<IUserOperation>): Partial<IUserOperation> {
    const obj = {
      sender:
        op.sender !== undefined
          ? ethers.getAddress(op.sender)
          : undefined,
      nonce:
        op.nonce !== undefined ? op.nonce : undefined,
      initCode:
        op.initCode !== undefined
          ? ethers.hexlify(op.initCode)
          : undefined,
      callData:
        op.callData !== undefined
          ? ethers.hexlify(op.callData)
          : undefined,
      callGasLimit:
        op.callGasLimit !== undefined
          ? BigInt(op.callGasLimit)
          : undefined,
      verificationGasLimit:
        op.verificationGasLimit !== undefined
          ? BigInt(op.verificationGasLimit)
          : undefined,
      preVerificationGas:
        op.preVerificationGas !== undefined
          ? BigInt(op.preVerificationGas)
          : undefined,
      maxFeePerGas:
        op.maxFeePerGas !== undefined
          ? BigInt(op.maxFeePerGas)
          : undefined,
      maxPriorityFeePerGas:
        op.maxPriorityFeePerGas !== undefined
          ? BigInt(op.maxPriorityFeePerGas)
          : undefined,
      paymasterAndData:
        op.paymasterAndData !== undefined
          ? ethers.hexlify(op.paymasterAndData)
          : undefined,
      signature:
        op.signature !== undefined
          ? ethers.hexlify(op.signature)
          : undefined,
    };
    return Object.keys(obj).reduce(
      (prev, curr) =>
        (obj as any)[curr] !== undefined
          ? { ...prev, [curr]: (obj as any)[curr] }
          : prev,
      {}
    );
  }
  clear(): UserOp {
    this.userOp = {...DEFAULT_USER_OP};
    return this;
  }
  resetToDefault(): UserOp {
    this.userOp = {...this.defaultUserOp};
    return this;
  }
  setSender(sender: string): UserOp { 
    this.userOp.sender = ethers.getAddress(sender); 
    return this;
  }
  setNonce(nonce: number): UserOp { 
    this.userOp.nonce = nonce; 
    return this;
  }
  setInitCode(initCode: ethers.BytesLike): UserOp { 
    this.userOp.initCode = ethers.hexlify(initCode); 
    return this;
  }
  setCallData(callData: ethers.BytesLike): UserOp { 
    this.userOp.callData =  ethers.hexlify(callData);
    return this;
  }
  setCallGasLimit(callGasLimit: ethers.BigNumberish): UserOp {
    this.userOp.callGasLimit = BigInt(callGasLimit);
    return this;
  }
  setVerificationGasLimit(verificationGasLimit: ethers.BigNumberish): UserOp {
    this.userOp.verificationGasLimit = BigInt(verificationGasLimit);
    return this;
  }
  setPreVerificationGas(preVerificationGas: ethers.BigNumberish): UserOp {
    this.userOp.preVerificationGas = BigInt(preVerificationGas);
    return this;
  }
  setMaxFeePerGas(maxFeePerGas: ethers.BigNumberish): UserOp {
    this.userOp.maxFeePerGas = BigInt(maxFeePerGas);
    return this;
  }
  setMaxPriorityFeePerGas(maxPriorityFeePerGas: ethers.BigNumberish): UserOp {
    this.userOp.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas);
    return this;
  }
  setPaymasterAndData(paymasterAndData: ethers.BytesLike): UserOp {
    this.userOp.paymasterAndData = ethers.hexlify(paymasterAndData);
    return this;
  }
  setSignature(signature: ethers.BytesLike): UserOp {
    this.userOp.signature = ethers.hexlify(signature);
    return this;
  }
  updateDefaults(userOp: Partial<IUserOperation>): UserOp {
    this.defaultUserOp = {...this.defaultUserOp, ...UserOp.resolveFields(userOp)};
    return this;
  }
  update(userOp: Partial<IUserOperation>): UserOp {
    this.userOp = {...this.userOp, ...UserOp.resolveFields(userOp)};
    return this;
  }
  copy(userOpObj: UserOp): UserOp {
    this.userOp = {...userOpObj.get()};
    this.middlewares = [...userOpObj.getMiddlewares()];
    return this;
  }
  setMiddleware(middleware: UserOpMiddlewareFn): UserOp {
    this.middlewares.push(middleware);
    return this;
  }
  async executeMiddlewares(): Promise<UserOp> {
    for (let middleware of this.middlewares){
      await middleware(this.userOp);
    }
    return this;
  }
  getSender() {return this.userOp.sender;};
  getNonce() {return this.userOp.nonce;}
  getInitCode() {return this.userOp.initCode;}
  getCallData() {return this.userOp.callData;}
  getCallGasLimit() {return (this.userOp.callGasLimit)}
  getVerificationGasLimit() {return this.userOp.verificationGasLimit;}
  getPreVerificationGas() {return this.userOp.preVerificationGas;}
  getMaxFeePerGas() {return this.userOp.maxFeePerGas;}
  getMaxPriorityFeePerGas() {return this.userOp.maxPriorityFeePerGas;}
  getPaymasterAndData() {return this.userOp.paymasterAndData;}
  getSignature() {return this.userOp.signature;}
  get(): IUserOperation {return this.userOp};
  getDefaults(): IUserOperation {return this.defaultUserOp;}
  getMiddlewares(): UserOpMiddlewareFn[] {return this.middlewares;}
  toJSON = (): {[key: string]: string} => {
    const userOp = {...this.userOp} as any;
    userOp.nonce = userOp.nonce.toString(16)
    userOp.callGasLimit = userOp.callGasLimit.toString(16);
    userOp.verificationGasLimit = userOp.verificationGasLimit.toString(16);
    userOp.preVerificationGas = userOp.preVerificationGas.toString(16);
    userOp.maxFeePerGas = userOp.maxFeePerGas.toString(16);
    userOp.maxPriorityFeePerGas = userOp.maxPriorityFeePerGas.toString(16);
    return userOp;
  }
}