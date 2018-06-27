SOURCE=./public/dist
TARGET=./preview

preview:
	@mkdir -p $(TARGET)
	@cp -Rfv $(SOURCE)/* $(TARGET)
	@cd $(TARGET) && anywhere

clean:
	@if [ -d preview ]; then rm -r preview; fi

.PHONY: preview clean